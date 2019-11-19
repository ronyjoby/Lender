import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { LendService } from '../services/lend.service';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {

  lendForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: any;
  lendService: LendService;
  lendAccountHistory: Observable<any[]>;
  accounts: Observable<any[]>;
  lastTransactionID: any;

  constructor(private formBuilder: FormBuilder, private router: Router, public db: AngularFireDatabase, lendService: LendService, private alertService:AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.lendService = lendService;
    this.lendAccountHistory = this.lendService.getLendHistory(this.currentUser.username);
    this.accounts = this.lendService.getAllAccountsById(this.currentUser.username);
  }

  ngOnInit() {

    this.lendForm = this.formBuilder.group({
      amount: ['', Validators.required],
      balance: ['0.00'],
      duration: ['', Validators.required],
      account: ['', Validators.required],
      interest: ['1.00'],
      maturity_date: [''],
      transaction_id: ['D' + Date.now() + Math.floor((Math.random() * 100) + 1)],
      transaction_date: [Date.now()],
      status: ['active'],
      username: [this.currentUser.username]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.lendForm.controls; }

  onSubmit() {
    
    this.submitted = true;

    if (this.lendForm.invalid) {
      console.log('Invalid entries.... returning');
      return;
    }
    const data = this.lendForm.value;
    data.interest = parseFloat(data.amount)/100;    
    data.balance = parseFloat(data.amount) + parseFloat(data.interest);
    data.maturity_date = this.getMaturityDate(data.duration);
    data.balance = data.amount;
   

    const object = this.lendService.addToLendAccount(data);
    
    if(!object){
      this.alertService.error('Error in saving data. Please try again');
    }
    else{
      this.updateBalanceAmount(data.account,data.amount);
      this.alertService.success('You have successfully invested the amount !');
    }

  }

  getMaturityDate(duration: string) {
    let maturity_date = new Date();
    maturity_date.setDate(maturity_date.getDate() + parseInt(duration) * 30);
    return maturity_date.getTime();
  }

  updateBalanceAmount(number:string,amount:string){   

    this.lendService.updateAccountBalance(number, amount);
  }
  
}
