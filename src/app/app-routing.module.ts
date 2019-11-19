import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LendComponent} from './lend/lend.component';
import {BorrowComponent} from './borrow/borrow.component';
import {ContactComponent} from './contact/contact.component';
import {LoanHistoryComponent} from './loan-history/loan-history.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminLoanHistoryComponent} from './admin/admin-loan-history/admin-loan-history.component';
import {AdminLendHistoryComponent} from './admin/admin-lend-history/admin-lend-history.component';
import {UsersComponent} from './admin/users/users.component';
import {ManageLoanComponent} from './admin/manage-loan/manage-loan.component';
import {UserCategoryComponent} from './admin/user-category/user-category.component';
import {CategoryDetailsComponent} from './admin/category-details/category-details.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {InvestmentsComponent} from './investments/investments.component';


import {WithdrawMoneyComponent} from './withdraw-money/withdraw-money.component';
import {AuthguardService} from './services/authguard.service';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },  
  { path:'login', component:LoginComponent },
  { path:'logout', component:LoginComponent },
  { path:'home', component:HomeComponent, canActivate: [AuthguardService] },
  { path:'invest', component:LendComponent, canActivate: [AuthguardService] },
  { path:'loans', component:LoanHistoryComponent, canActivate: [AuthguardService] },
  { path:'borrow', component:BorrowComponent, canActivate: [AuthguardService] },
  { path:'contact', component:ContactComponent , canActivate: [AuthguardService]},  
  { path:'admin/loans', component:AdminLoanHistoryComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'admin/investments', component:AdminLendHistoryComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'withdraw', component:WithdrawComponent , canActivate: [AuthguardService]},
  { path:'withdraw-money', component:WithdrawMoneyComponent , canActivate: [AuthguardService]},
  { path:'investments', component:InvestmentsComponent , canActivate: [AuthguardService]},
  { path:'admin/home', component:AdminHomeComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'admin/users', component:UsersComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'admin/manage-loan', component:ManageLoanComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'admin/category', component:UserCategoryComponent , canActivate: [AuthguardService, AdminGuard]},
  { path:'admin/category-details', component:CategoryDetailsComponent , canActivate: [AuthguardService, AdminGuard]},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
