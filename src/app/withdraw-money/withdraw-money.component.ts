import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { LendService } from '../services/lend.service';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {

  withdrawForm: FormGroup;  
  submitted = false;
  lendService: LendService;
  history :any;



  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, lendService: LendService, private alertService: AlertService) {
    this.lendService = lendService;
    this.route.queryParams.subscribe(params => {
      this.history = JSON.parse(params["history"]);
    }); 


  }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      amount: [this.history.amount, Validators.required],
      balance: [''],
      duration: [this.history.duration, Validators.required],
      account: [this.history.account, Validators.required],
      interest: [''],
      maturity_date: [this.history.maturity_date, Validators.required],
      transaction_id: [this.history.transaction_id, Validators.required],
      transaction_date: [this.history.transaction_date],
      username: [this.history.username]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.withdrawForm.controls; }

  onSubmit() {

    this.submitted = true;


   if (this.withdrawForm.invalid) {
      console.log('Invalid entries.... returning');
      return;
    } 

    const data = this.withdrawForm.value;
    data.interest = '0';
    data.balance = '0';   
    data.status = 'closed';    
  

    const object = this.lendService.updateLendAccount(data);
    this.alertService.success('Data updated successfully');

  }

  
}
