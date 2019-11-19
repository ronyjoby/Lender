import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { fakeBackendProvider } from './services/fake-backend.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LendComponent } from './lend/lend.component';
import { BorrowComponent } from './borrow/borrow.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderBoarderComponent } from './header-boarder/header-boarder.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { InvestHistoryComponent } from './invest-history/invest-history.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { AlertComponent } from './alert/alert.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {AlertService} from './services/alert.service';
import {AuthguardService} from './services/authguard.service';
import {errorintercepterService} from './services/errorintercepter.service';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {AdminGuard} from './auth/admin.guard';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { AdminLendHistoryComponent } from './admin/admin-lend-history/admin-lend-history.component';
import { AdminLoanHistoryComponent } from './admin/admin-loan-history/admin-loan-history.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { UserProfileComponent } from './admin/user-profile/user-profile.component';
import { UserCategoryComponent } from './admin/user-category/user-category.component';
import { CategoryDetailsComponent } from './admin/category-details/category-details.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ManageLoanComponent } from './admin/manage-loan/manage-loan.component';
import { InvestmentsComponent } from './investments/investments.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeftMenuComponent,
    NavBarComponent,
    FooterComponent,
    LendComponent,
    BorrowComponent,
    ContactComponent,
    HeaderBoarderComponent,
    InvestHistoryComponent,
    LoanHistoryComponent,
    AlertComponent,
    AdminHomeComponent,
    WithdrawMoneyComponent,
    AdminLendHistoryComponent,
    AdminLoanHistoryComponent,
    NavAdminComponent,
    UsersComponent,
    UserProfileComponent,
    UserCategoryComponent,
    CategoryDetailsComponent,
    WithdrawComponent,
    ManageLoanComponent,
    InvestmentsComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [fakeBackendProvider,AlertService,AuthguardService,errorintercepterService,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
