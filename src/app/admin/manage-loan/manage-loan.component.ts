import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-loan',
  templateUrl: './manage-loan.component.html',
  styleUrls: ['./manage-loan.component.css']
})
export class ManageLoanComponent implements OnInit {

  categories: Observable<any[]>;
  loan: any;
  submitted = false;
  loanApprovalsForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService, private formBuilder: FormBuilder, private alertService: AlertService) {
    this.route.queryParams.subscribe(params => {
      this.loan = JSON.parse(params["loan"]);
    });


  }

  ngOnInit() {
    this.loanApprovalsForm = this.formBuilder.group({
      account: [this.loan.account, Validators.required],
      amount: [this.loan.amount, Validators.required],
      maturity_date: [this.loan.maturity_date, Validators.required],
      interest: [this.loan.interest, Validators.required],
      status: [this.loan.status, Validators.required],
      transaction_id: [this.loan.transaction_id]
    });
    console.log(this.loan);
  }
  onSubmit(): void {
    this.submitted = true;


    if (this.loanApprovalsForm.invalid) {
      console.log('Invalid entries.... returning');
      return;
    }

    const data = this.loanApprovalsForm.value;
    alert(data.transaction_id);
    const obj = this.adminService.updateLoan(data);
    if (obj) {
      this.updateBalanceAmount(data.account, data.amount);
      this.alertService.success('Data updated successfully');
      this.router.navigate(["/admin/loans"]);
    } else {
      this.alertService.error('Error updating category');
    }

  }

  reject(): void {
    const data = this.loanApprovalsForm.value;
    const obj = this.adminService.rejectLoan(data);

    if (obj) {
      this.alertService.success('loan rejected ');
      this.router.navigate(["/admin/loans"]);
    } else {
      this.alertService.error('Error updating category');
    }

  }
  updateBalanceAmount(number: string, amount: string) {

    this.adminService.updateAccountBalance(number, amount);
  }

}
