import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Deal, DealOperations} from '../models/Deal';
import {Person} from '../models/Person';
import {Transfer} from '../models/Transfer';
import {Account} from '../models/Account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddPersonRequest} from '../models/requests/AddPersonRequest';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {flatMap} from 'rxjs/operators';
import {WithId} from '../models/responses/WithId';
import {AddDealRequest} from '../models/requests/AddDealRequest';
import {BackendPerson} from '../models/responses/BackendPerson';
import {AddTransferRequest} from '../models/requests/AddTransferRequest';
import {first} from 'rxjs/internal/operators/first';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private deals: BehaviorSubject<Map<string, Deal>> = new BehaviorSubject(new Map());
  private persons: BehaviorSubject<Map<string, Person>> = new BehaviorSubject(new Map());
  private transfers: BehaviorSubject<Map<string, Transfer>> = new BehaviorSubject(new Map<string, Transfer>());
  private accountId: string;

  constructor(private http: HttpClient) {
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

  private accountIdParams() {
    return {
      params: new HttpParams().set('accountId', this.accountId),
      withCredentials: true,
    };
  }

  setAccount(id: string): Observable<Account> {
    this.accountId = id;
    return this.http.get<Account>(this.getAccountUrl, this.accountIdParams());
  }

  getDeals(): Observable<Map<string, Deal>> {
    return this.http
      .get<(Deal & WithId)[]>(this.getDealsUrl, this.accountIdParams())
      .pipe(flatMap(deals => {
        const newDeals = new Map<string, Deal>();
        deals.forEach(deal => newDeals.set(deal.id, DealOperations.parseDeal(deal)));
        this.deals.next(newDeals);
        return this.deals;
      }));
  }

  addDeal(deal: Deal): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addDealUrl, AddDealRequest.fromDeal(deal, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => this.getDeals()),
        flatMap(() => this.getPersons()),
        first(),
      );
  }

  updateDeal(id: string, deal: Deal): Observable<{}> {
    const options = {params: new HttpParams().set('dealId', id), withCredentials: true};
    return this.http
      .post<AddAnythingResponse>(this.updateDealUrl, AddDealRequest.fromDeal(deal, this.accountId), options)
      .pipe(
        flatMap(() => this.getDeals()),
        flatMap(() => this.getPersons()),
        first(),
      );
  }

  removeDeal(id: string): Observable<{}> {
    const options = {params: new HttpParams().set('dealId', id), withCredentials: true};
    return this.http.delete(this.deleteDealUrl, options).pipe(
      flatMap(() => this.getDeals()),
      flatMap(() => this.getPersons()),
      first(),
    );
  }

  getPersons(): Observable<Map<string, Person>> {
    return this.http
      .get<(BackendPerson)[]>(this.getPersonsUrl, this.accountIdParams())
      .pipe(
        flatMap(persons => {
          const newPersons = new Map<string, Person>();
          persons.forEach(person => newPersons.set(person.id, BackendPerson.toPerson(person)));
          this.persons.next(newPersons);
          return this.persons;
        }),
      );
  }

  addPerson(person: Person): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addPersonUrl, AddPersonRequest.fromPerson(person, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => this.getPersons()),
        first(),
      );
  }

  // updatePerson(id: string, person: Person): Observable<{}> {
  //   this.persons.next(new Map(this.persons.getValue()).set(id, person));
  //   return of({});
  // }
  //
  // removePerson(id: string): Observable<{}> {
  //   const map1 = new Map(this.persons.getValue());
  //   map1.delete(id);
  //   this.persons.next(map1);
  //   return of({});
  // }


  getTransfers(): Observable<Map<string, Transfer>> {
    return this.http
      .get<(Transfer & WithId)[]>(this.getTransfersUrl, this.accountIdParams())
      .pipe(
        flatMap(transfers => {
          const newTransfers = new Map<string, Transfer>();
          transfers.forEach(deal => newTransfers.set(deal.id, deal));
          this.transfers.next(newTransfers);
          return this.transfers;
        })
      );
  }

  addTransfer(transfer: Transfer): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addTransferUrl, AddTransferRequest.fromTransfer(transfer, this.accountId), this.accountIdParams())
      .pipe(
        flatMap(() => {
          return this.getTransfers();
        }),
        flatMap(() => {
          return this.getPersons();
        }),
        first(),
      );
  }

  removeTransfer(id: string): Observable<{}> {
    const options = {params: new HttpParams().set('transferId', id), withCredentials: true};
    return this.http.delete(this.deleteTransferUrl, options).pipe(
      flatMap(() => this.getPersons()),
      flatMap(() => this.getTransfers()),
      first(),
    );
  }

  updateTransfer(id: string, transfer: Transfer): Observable<{}> {
    const options = {params: new HttpParams().set('transferId', id), withCredentials: true};
    return this.http
      .post<AddAnythingResponse>(this.updateTransferUrl, AddTransferRequest.fromTransfer(transfer, this.accountId), options)
      .pipe(
        flatMap(() => {
          return this.getTransfers();
        }),
        flatMap(() => {
          return this.getPersons();
        }),
        first(),
      );

  }
}
