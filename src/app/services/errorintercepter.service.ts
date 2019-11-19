import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorintercepterService implements HttpInterceptor {

  constructor(private loginService :LoginService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      alert('error service : ');
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.loginService.logout();
                location.reload(true);
            }
            

            const error = err.error.message || err.statusText;
            alert('error service : ' + error);
            return throwError(error);
        }))
    }
}
export let errorintercepterService = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorintercepterService,
    multi: true
};
