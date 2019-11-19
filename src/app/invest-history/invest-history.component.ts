import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LendService } from '../services/lend.service';

@Component({
  selector: 'app-invest-history',
  templateUrl: './invest-history.component.html',
  styleUrls: ['./invest-history.component.css']
})
export class InvestHistoryComponent implements OnInit {

lendAccountHistory : Observable<any[]>;
currentUser: any;
  constructor(private lendService: LendService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
    this.lendAccountHistory = this.lendService.getLendHistory(this.currentUser.username);    
  }

  ngOnInit() {
  }

}
