import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {Account} from '../models/Account';
import {Error} from '../models/Error';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {NewUser} from '../models/NewUser';
import {WithId} from '../models/responses/WithId';
import {catchError, flatMap, map} from 'rxjs/operators';
import {User} from '../models/User';
import {Cached} from '../caching/Cached';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private addAccountUrl = 'https://buycycle.ml/api/addAccount';
  private loginUrl = 'https://buycycle.ml/api/login';
  private registerUrl = 'https://buycycle.ml/api/register';
  private getAccountsUrl = 'https://buycycle.ml/api/getAccounts';
  private logoutUrl = 'https://buycycle.ml/api/logout';
  private getUserUrl = 'https://buycycle.ml/api/whoAmI';

  private user: Cached<User> = new Cached<User>(() => this.http.get<User>(this.getUserUrl, this.options));

  private options = {withCredentials: true};

  constructor(private http: HttpClient) {
  }

  createAccount(account: Account): Observable<AddAnythingResponse> {
    return this.http.post<AddAnythingResponse>(this.addAccountUrl, account, this.options);
  }

  login(user: NewUser): Observable<{}> {
    return this.http.post(this.loginUrl, user, this.options).pipe(
      flatMap(() => this.user.forceGet()),
      catchError((error, _) => {
        switch (error.status) {
          case 401:
            throw new Error(error.status, 'Неверный логин или пароль');
          default:
            throw new Error(error.status, 'Произошла неизвестная ошибка');
        }
      }),
    );
  }

  register(user: NewUser): Observable<{}> {
    return this.http.post(this.registerUrl, user, this.options)
      .pipe(
        flatMap(() => this.user.forceGet()),
        catchError((error, _) => {
          switch (error.status) {
            case 400:
              if (error.error.status === 'registration_error') {
                throw new Error(error.status, 'Логин уже занят');
              } else {
                throw new Error(error.status, 'Произошла неизвестная ошибка');
              }
            default:
              throw new Error(error.status, 'Произошла неизвестная ошибка');
          }
        })
      );
  }

  getAccounts(): Observable<Account & WithId[]> {
    return this.http
      .get<Account & WithId[]>(this.getAccountsUrl, this.options);
  }

  getUser(): Observable<User> {
    return this.user.get();
  }

  isAuthorised(): Observable<boolean> {
    return this.user.get().pipe(
      map(user => user.isRegistered)
    );
  }

  logout(): Observable<{}> {
    return this.http.post(this.logoutUrl, {}, this.options).pipe(
      flatMap(() => this.user.forceGet())
    );
  }
}
