import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = [{id:1,username:'admin',isAdmin:true,firstName:'Rony',lastName:'Mathew',password:'admin', address:'Lake mary No 6 church road', city:'alaska', state:'alabama',zipcode:'12345',email:'john@doe.com',gender:'male'}
        ,{id:2,username:'rony',isAdmin:false,firstName:'Joby',lastName:'Mathew',password:'goal', address:'Lake mary No 6 church road', city:'alaska', state:'alabama',zipcode:'12345',email:'john@doe.com',gender:'male'}]
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address:user.address,
                        city:user.city,
                        state:user.state,
                        zipcode:user.zipcode,
                        gender:user.gender,
                        email:user.email,
                        isAdmin:user.isAdmin,
                        token: 'fake-jwt-token'
                    };
 
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: {message:'Username or password is incorrect' } });
                }
            }
 
           
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendService,
    multi: true
};

