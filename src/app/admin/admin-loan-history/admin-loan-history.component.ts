import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-admin-loan-history',
  templateUrl: './admin-loan-history.component.html',
  styleUrls: ['./admin-loan-history.component.css']
})
export class AdminLoanHistoryComponent implements OnInit {

  loanAccountHistory: Observable<any[]>;
  currentUser: any;
  constructor(private adminService: AdminService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loanAccountHistory = this.adminService.getLoanHistory();
  }

  manageLoan(item: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "loan": JSON.stringify(item)
      }
    };
    this.router.navigate(["/admin/manage-loan"], navigationExtras);
  }

  ngOnInit() {
  }

}
