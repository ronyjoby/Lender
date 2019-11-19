import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account';



@Injectable({
  providedIn: 'root'
})
export class LendService {

  lendAccountHistory: AngularFireList<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.lendAccountHistory = this.db.list('/lend-account-history');
  }
  addToLendAccount(data: any): AngularFireObject<any> {
    //const adKey = this.lendAccountHistory.push(data);
    this.lendAccountHistory.set(data.transaction_id, data);
    return this.db.object('/lend-account-history/' + data.transaction_id);
  }
  updateLendAccount(data: any): AngularFireObject<any> {

    const itemRef = this.db.object('/lend-account-history/' + data.transaction_id);
    itemRef.update({ status: 'closed' });
    return itemRef;
  }
  getLendHistory(username: string): Observable<any[]> {
    return this.db.list('lend-account-history', ref => ref.orderByChild('username').equalTo(username)).valueChanges();
  }

  getLendHistoryByID(key: string): Observable<any> {
    return this.db.object('/lend-account-history/' + key).valueChanges();

  }

  getLendHistoryAsFireList(username: string): AngularFireList<any[]> {
    return this.db.list('lend-account-history', ref => ref.orderByChild('username').equalTo(username));
  }
  getAllAccountsById(username: string): Observable<any[]> {
    return this.db.list('accounts', ref => ref.orderByChild('username').equalTo(username)).valueChanges();
  }
  getAccountByNumber(account_number: string): AngularFireObject<any> {
    return this.db.object('/accounts/' + account_number);
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
    balance = parseFloat(balance) - parseFloat(amount);
    itemRef.update({ account_balance: String(balance) });
    return itemRef;
  }
}
