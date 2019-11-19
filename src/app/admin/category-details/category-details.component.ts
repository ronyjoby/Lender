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
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categories: Observable<any[]>;
  category: any;
  submitted = false;
  categoryDetailsForm: FormGroup;
  constructor(private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private alertService: AlertService) {
    this.route.queryParams.subscribe(params => {
      this.category = JSON.parse(params["category"]);
    });
    this.categories = this.adminService.getAllCategories();

  }

  ngOnInit() {
    this.categoryDetailsForm = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      lend_interest: [this.category.lend_interest, Validators.required],
      loan_interest: [this.category.loan_interest, Validators.required],
      pre_approval_limit: [this.category.pre_approval_limit, Validators.required],
      total_loan_amount_limit: [this.category.total_loan_amount_limit, Validators.required]
    });
  }
  get f() { return this.categoryDetailsForm.controls; }
  onSubmit(): void {
    this.submitted = true;


    if (this.categoryDetailsForm.invalid) {
      console.log('Invalid entries.... returning');
      return;
    }

    const data = this.categoryDetailsForm.value;
    const obj = this.adminService.updateCategory(data);
    if (obj) {
      this.alertService.success('Data updated successfully');
    } else {
      this.alertService.error('Error updating category');
    }

  }

}
