import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { LoanService } from '../services/loan.service';
import { AlertService } from '../services/alert.service';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  loanForm: FormGroup;
  submitted = false;
  currentUser: any;
  loanService: LoanService;
  categories: Observable<any[]>;
  accounts: Observable<any[]>;
  isPreApprovedLoan : boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public db: AngularFireDatabase, loanService: LoanService, private alertService: AlertService, private adminService: AdminService, ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loanService = loanService;
    this.accounts = this.loanService.getAllAccountsById(this.currentUser.username);
  }

  ngOnInit() {

    this.loanForm = this.formBuilder.group({
      account: ['', Validators.required],
      amount: ['', Validators.required],
      duration: ['', Validators.required],
      maturity_date: [''],
      status: ['pending'],
      transaction_date: [Date.now()],
      transaction_id: ['LZ' + Date.now() + Math.floor((Math.random() * 100) + 1)],
      username: [this.currentUser.username],
      balance: [''],
      interest: ['0.00'],

    });
  }

  get f() {
    return this.loanForm.controls;
  }

  getMaturityDate(duration: string) {
    let maturity_date = new Date();
    maturity_date.setDate(maturity_date.getDate() + parseInt(duration));
    return maturity_date.getTime();
  }

  onSubmit() {

    this.submitted = true;

    if (this.loanForm.invalid) {
      return;
    }

    const data = this.loanForm.value;
    if (this.isPreApproved(data)) {
      data.status = "approved";
      this.isPreApprovedLoan = true;
      this.updateBalanceAmount(data.account, data.amount);
    }
    // data.interest = parseFloat(data.amount)/100;    
    // data.balance = parseFloat(data.amount) + parseFloat(data.interest);
    data.maturity_date = this.getMaturityDate(data.duration);
    data.balance = data.amount;
    const object = this.loanService.addToLoanHistory(data);
    if (object) {
      if(this.isPreApprovedLoan){
        this.alertService.success('Congratulations. Pre approved loan amount will be credited to your account');
      }else{
        this.alertService.success('Loan applied successfully. Sent for further approval from bank admin.');
      }
      
    }    
    else {
      this.alertService.error('Error occured, please try again');
    }


  }
  updateBalanceAmount(number: string, amount: string) {
    this.loanService.updateAccountBalance(number, amount);
  }
  isPreApproved(data): boolean { 
    if(parseFloat(data.amount) > 500){
      return false;
    }
    return true;
  }
}
