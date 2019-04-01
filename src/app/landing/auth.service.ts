import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../models/Account';
import {HttpClient} from '@angular/common/http';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private addAccountUrl = 'https://buycycle.ml/api/addAccount';

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<AddAnythingResponse> {
    return this.http.post<AddAnythingResponse>(this.addAccountUrl, account);
  }
}
