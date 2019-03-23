import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Account} from '../models/Account';
import {HttpClient} from '@angular/common/http';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private addAccountUrl = 'http://80.240.31.209:8000/api/addAccount';

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<AddAnythingResponse> {
    return this.http.post<AddAnythingResponse>(this.addAccountUrl, account);
  }
}
