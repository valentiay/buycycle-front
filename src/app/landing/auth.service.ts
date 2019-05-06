import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Account} from '../models/Account';
import {Error} from '../models/Error';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {User} from '../models/User';
import {WithId} from '../models/responses/WithId';
import {catchError, flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private addAccountUrl = 'https://buycycle.ml/api/addAccount';
  private loginUrl = 'https://buycycle.ml/api/login';
  private registerUrl = 'https://buycycle.ml/api/register';
  private getAccountsUrl = 'https://buycycle.ml/api/getAccounts';
  private logoutUrl = 'https://buycycle.ml/api/logout';

  private accounts: BehaviorSubject<Account & WithId[]> = new BehaviorSubject(null);

  private options = {withCredentials: true};

  private handleError = catchError((error, caught) => {
    throw new Error(error.code, 'Произошла неизвестная ошибка');
  });

  constructor(private http: HttpClient) {
  }

  createAccount(account: Account): Observable<AddAnythingResponse> {
    return this.http.post<AddAnythingResponse>(this.addAccountUrl, account);
  }

  login(user: User): Observable<{}> {
    return this.http.post(this.loginUrl, user, this.options).pipe(this.handleError);
  }

  register(user: User): Observable<{}> {
    return this.http.post(this.registerUrl, user, this.options);
  }

  getAccounts(): Observable<Account & WithId[]> {
    return this.http
      .get<Account & WithId[]>(this.getAccountsUrl, this.options)
      .pipe(flatMap(accounts => {
        this.accounts.next(accounts);
        return this.accounts;
      }));
  }

  isAuthorised(): Observable<boolean> {
    return this.http
      .get<Account & WithId[]>(this.getAccountsUrl, this.options)
      .pipe(
        map(accounts => {
          this.accounts.next(accounts);
          return true;
        }),
        catchError((error, caught) => {
          return of(false);
        }),
      );
  }

  logout(): Observable<{}> {
    return this.http.post(this.logoutUrl, this.options);
  }
}
