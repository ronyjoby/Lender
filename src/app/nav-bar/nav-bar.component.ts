import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isAdmin: string = "false";
  constructor() {
    this.isAdmin = localStorage.getItem("isAdmin");



  }

  ngOnInit() {
  }

}
