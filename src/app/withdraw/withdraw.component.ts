import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import {LendService} from  '../services/lend.service';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {



  lendAccountHistory : Observable<any[]>;
  currentUser: any;
  

  constructor(private router: Router, private lendService: LendService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
    this.lendAccountHistory = this.lendService.getLendHistory(this.currentUser.username); 
  }

  ngOnInit() {
  }
  manageWithdraw(item: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "history": JSON.stringify(item)
      }
    };
    this.router.navigate(["/withdraw-money"], navigationExtras);
  }

}
