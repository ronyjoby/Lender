import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //lendAccountHistory: Observable<any[]>;
 // currentUser: any;
  constructor(private service: HomeService) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
    // this.lendAccountHistory = this.service.getLendHistory(this.currentUser.username);
  }


  ngOnInit() {
  }

}
