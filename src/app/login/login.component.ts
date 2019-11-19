import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
  currentUser: any;
  users: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private route: ActivatedRoute, public db: AngularFireDatabase, private alertService: AlertService) {
    this.users = db.list('/users').valueChanges();
    console.log(this.users);
  }

  ngOnInit() {

    this.loginService.logout();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  validateLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f.userName.value, this.f.passWord.value)
      .pipe(first())
      .subscribe(
      user => {
        this.currentUser = user;
        if(this.currentUser.isAdmin){
          this.router.navigate(['/admin/home']);
        }
        else{
            this.router.navigate(['/home']);            
        }        
      },
      error => {        
        const err = error.error.message; 
        this.alertService.error(err);
      }
      );
  }

}
