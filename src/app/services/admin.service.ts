import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public db: AngularFireDatabase) {

  }
  getLendHistory(): Observable<any[]> {
    return this.db.list('/lend-account-history').valueChanges();
  }
  getLoanHistory(): Observable<any[]> {
    return this.db.list('/loan-account-history').valueChanges();
  }
  getAllUsers(): Observable<any[]> {
    return this.db.list('/users').valueChanges();
  }
  getAllCategories(): Observable<any[]> {
    return this.db.list('/category').valueChanges();
  }
  getAllCategoryById(username:string): Observable<any[]> {
    return this.db.list('/category/' + username).valueChanges();
  }
  updateCategory(data:any){
    const itemRef = this.db.object('/category/' + data.name);
    itemRef.update(data);
    return itemRef;
  }
  updateLoan(data:any){    
    const itemRef = this.db.object('/loan-account-history/' + data.transaction_id);
    itemRef.update({status:'approved'});
    return itemRef;
  }
  rejectLoan(data:any){    
    const itemRef = this.db.object('/loan-account-history/' + data.transaction_id);
    itemRef.update({status:'rejected'});
    return itemRef;
  }
  updateAccountBalance(account_number: string, amount: any): AngularFireObject<any> {
    const itemsRef = this.db.list<Account>('/accounts/' + account_number);
    let balance;
    itemsRef.valueChanges().subscribe((res: Account[]) => {
      balance = res[0];
      return this.updateBalance(account_number, balance, amount);
    });
    return null;
  }
  updateBalance(account_number, balance, amount): AngularFireObject<any> {
    const itemRef = this.db.object('/accounts/' + account_number);
    balance = parseFloat(balance) + parseFloat(amount);
    itemRef.update({ account_balance: String(balance) });
    return itemRef;
  }

}
