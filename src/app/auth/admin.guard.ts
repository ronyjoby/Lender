import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private auth: LoginService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAdmin) {
      return true;
    }
    //this.router.navigate(['/home']);
    return false;
  }
}