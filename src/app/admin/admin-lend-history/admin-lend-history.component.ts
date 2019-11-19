import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-lend-history',
  templateUrl: './admin-lend-history.component.html',
  styleUrls: ['./admin-lend-history.component.css']
})
export class AdminLendHistoryComponent implements OnInit {

  lendAccountHistory: Observable<any[]>;
  currentUser: any;
  constructor(private adminService: AdminService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.lendAccountHistory = this.adminService.getLendHistory();
  }

  ngOnInit() {
  }

}