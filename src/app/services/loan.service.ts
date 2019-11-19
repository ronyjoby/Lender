import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  loanAccountHistory: AngularFireList<any[]>;
  history: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.loanAccountHistory = this.db.list('/loan-account-history');
  }
  addToLoanHistory(data: any): AngularFireObject<any> {
    this.loanAccountHistory.set(data.transaction_id, data);
    return this.db.object('/loan-account-history/' + data.transaction_id);
  }

  getLoanHistory(username: string): Observable<any[]> {
    return this.db.list('loan-account-history', ref => ref.orderByChild('username').equalTo(username)).valueChanges();
  }
  getAllAccountsById(username: string): Observable<any[]> {
    return this.db.list('accounts', ref => ref.orderByChild('username').equalTo(username)).valueChanges();
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
