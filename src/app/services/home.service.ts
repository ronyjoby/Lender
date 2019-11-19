import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public db: AngularFireDatabase) { }

  getLendHistory(username: string): Observable<any[]> {    
    return  this.db.list('lend-account-history',ref => ref.orderByChild('username').equalTo(username)).valueChanges();
    
  }
}
