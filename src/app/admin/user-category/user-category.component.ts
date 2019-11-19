import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.css']
})
export class UserCategoryComponent implements OnInit {

  categories: Observable<any[]>;

  constructor(private adminService: AdminService, private router: Router) {
    this.categories = this.adminService.getAllCategories();
  }

  manageCategory(item: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "category": JSON.stringify(item)
      }
    };
    this.router.navigate(["/admin/category-details"], navigationExtras);
  }

  ngOnInit() {

  }
}


