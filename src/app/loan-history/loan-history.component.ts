import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.css']
})
export class LoanHistoryComponent implements OnInit {

  loanAccountHistory: Observable<any[]>;
  currentUser: any;
  constructor(private loanService: LoanService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loanAccountHistory = this.loanService.getLoanHistory(this.currentUser.username);
  }

  ngOnInit() {
  }

}
