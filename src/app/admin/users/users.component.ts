import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Observable<any[]>;
  constructor(private adminService: AdminService) {
    this.users = this.adminService.getAllUsers();
   }

  ngOnInit() {
  }

}
