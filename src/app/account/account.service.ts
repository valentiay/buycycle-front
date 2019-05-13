import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Deal, DealOperations} from '../models/Deal';
import {Person} from '../models/Person';
import {Transfer} from '../models/Transfer';
import {Account} from '../models/Account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddPersonRequest} from '../models/requests/AddPersonRequest';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {catchError, flatMap, map, tap} from 'rxjs/operators';
import {WithId} from '../models/responses/WithId';
import {AddDealRequest} from '../models/requests/AddDealRequest';
import {BackendPerson} from '../models/responses/BackendPerson';
import {AddTransferRequest} from '../models/requests/AddTransferRequest';
import {first} from 'rxjs/internal/operators/first';
import {Cached} from '../caching/Cached';
import {Router} from '@angular/router';
import {AuthService} from '../landing/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
  }

  private getAccountUrl = 'https://buycycle.ml/api/getAccount';

  private addPersonUrl = 'https://buycycle.ml/api/addPerson';
  private getPersonsUrl = 'https://buycycle.ml/api/getPersons';

  private addDealUrl = 'https://buycycle.ml/api/addDeal';
  private updateDealUrl = 'https://buycycle.ml/api/updateDeal';
  private getDealsUrl = 'https://buycycle.ml/api/getDeals';
  private deleteDealUrl = 'https://buycycle.ml/api/deleteDeal';

  private addTransferUrl = 'https://buycycle.ml/api/addTransfer';
  private updateTransferUrl = 'https://buycycle.ml/api/updateTransfer';
  private getTransfersUrl = 'https://buycycle.ml/api/getTransfers';
  private deleteTransferUrl = 'https://buycycle.ml/api/deleteTransfer';

  private processErrors = catchError((error, caught) => {
    switch (error.status) {
      case 401:
        this.router.navigateByUrl('/401');
        throw caught;
      case 404:
        this.router.navigateByUrl('/404');
        throw caught;
      default:
        throw caught;
    }
  });

  private accountId: string;
  private account: BehaviorSubject<Account> = new BehaviorSubject(null);

  private deals: Cached<Map<string, Deal>> = new Cached(() =>
    this.http
      .get<(Deal & WithId)[]>(this.getDealsUrl, this.accountIdParams())
      .pipe(
        map(deals => {
            const newDeals = new Map<string, Deal>();
            deals.forEach(deal => newDeals.set(deal.id, DealOperations.parseDeal(deal)));
            return newDeals;
          },
          this.processErrors
        )
      )
  );

  // @ts-ignore
  private persons: Cached<Map<string, Person>> = new Cached(() =>
    this.http
      .get<(BackendPerson)[]>(this.getPersonsUrl, this.accountIdParams())
      .pipe(
        map(persons => {
          const newPersons = new Map<string, Person>();
          persons.forEach(person => newPersons.set(person.id, BackendPerson.toPerson(person)));
          return newPersons;
        }),
        this.processErrors
      )
  );

  // @ts-ignore
  private transfers: Cached<Map<string, Transfer>> = new Cached(() => this.http
    .get<(Transfer & WithId)[]>(this.getTransfersUrl, this.accountIdParams())
    .pipe(
      map(transfers => {
        const newTransfers = new Map<string, Transfer>();
        transfers.forEach(deal => newTransfers.set(deal.id, deal));
        return newTransfers;
      }),
      this.processErrors
    ));

  private accountIdParams() {
    return {
      params: new HttpParams().set('accountId', this.accountId),
      withCredentials: true,
    };
  }

  setAccount(id: string): Observable<Account> {
    this.accountId = id;
    return this.http.get<Account>(this.getAccountUrl, this.accountIdParams()).pipe(
      tap(account => this.account.next(account))
    );
  }

  isEditable(): Observable<boolean> {
    return this.auth.getUser().pipe(
      flatMap(user =>
        this.account.pipe(
          map(account => account && (account.mode === 'public' || account.owner === user.userId))
        )
      )
    );
  }

  getDeals(): Observable<Map<string, Deal>> {
    return this.deals.get();
  }

  addDeal(deal: Deal): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addDealUrl, AddDealRequest.fromDeal(deal, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => this.deals.forceGet()),
        flatMap(() => this.persons.forceGet()),
        this.processErrors,
        first(),
      );
  }

  updateDeal(id: string, deal: Deal): Observable<{}> {
    const options = {params: new HttpParams().set('dealId', id), withCredentials: true};
    return this.http
      .post<AddAnythingResponse>(this.updateDealUrl, AddDealRequest.fromDeal(deal, this.accountId), options)
      .pipe(
        flatMap(() => this.deals.forceGet()),
        flatMap(() => this.persons.forceGet()),
        this.processErrors,
        first(),
      );
  }

  removeDeal(id: string): Observable<{}> {
    const options = {params: new HttpParams().set('dealId', id), withCredentials: true};
    return this.http.delete(this.deleteDealUrl, options).pipe(
      flatMap(() => this.deals.forceGet()),
      flatMap(() => this.persons.forceGet()),
      this.processErrors,
      first(),
    );
  }

  getPersons(): Observable<Map<string, Person>> {
    return this.persons.get();
  }

  addPerson(person: Person): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addPersonUrl, AddPersonRequest.fromPerson(person, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => this.persons.forceGet()),
        this.processErrors,
        first(),
      );
  }

  getTransfers(): Observable<Map<string, Transfer>> {
    return this.transfers.get();
  }

  addTransfer(transfer: Transfer): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addTransferUrl, AddTransferRequest.fromTransfer(transfer, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => this.transfers.forceGet()),
        flatMap(() => this.persons.forceGet()),
        this.processErrors,
        first(),
      );
  }

  removeTransfer(id: string): Observable<{}> {
    const options = {params: new HttpParams().set('transferId', id), withCredentials: true};
    return this.http.delete(this.deleteTransferUrl, options).pipe(
      flatMap(() => this.persons.forceGet()),
      flatMap(() => this.transfers.forceGet()),
      this.processErrors,
      first(),
    );
  }

  updateTransfer(id: string, transfer: Transfer): Observable<{}> {
    const options = {params: new HttpParams().set('transferId', id), withCredentials: true};
    return this.http
      .post<AddAnythingResponse>(this.updateTransferUrl, AddTransferRequest.fromTransfer(transfer, this.accountId), options)
      .pipe(
        flatMap(() => this.transfers.forceGet()),
        flatMap(() => this.persons.forceGet()),
        this.processErrors,
        first(),
      );

  }
}
