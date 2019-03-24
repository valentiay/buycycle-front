import {Injectable} from '@angular/core';
import {DebtorDeal} from '../models/DebtorDeal';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OneForAllDeal} from '../models/OneForAllDeal';
import {Deal} from '../models/Deal';
import {Person} from '../models/Person';
import {Transfer} from '../models/Transfer';
import {Account} from '../models/Account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddPersonRequest} from '../models/requests/AddPersonRequest';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {flatMap} from 'rxjs/operators';
import {WithId} from '../models/responses/WithId';
import {AddDealRequest} from "../models/requests/AddDealRequest";

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

  private getAccountUrl = 'http://80.240.31.209:8000/api/getAccount';
  private addPersonUrl = 'http://80.240.31.209:8000/api/addPerson';
  private getPersonsUrl = 'http://80.240.31.209:8000/api/getPersons';
  private addDealUrl = 'http://80.240.31.209:8000/api/addDeal';
  private getDealsUrl = 'http://80.240.31.209:8000/api/getDeals';
  private getTransfersUrl = 'http://80.240.31.209:8000/api/getTransfers';

  private accountIdParams() {
    return {params: new HttpParams().set('accountId', this.accountId)};
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
        deals.forEach(deal => newDeals.set(deal.id, deal));
        this.deals.next(newDeals);
        return this.deals;
      }));
  }

  addDeal(deal: Deal): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addDealUrl, AddDealRequest.fromDeal(deal, this.accountId))
      .pipe(
        flatMap(() => this.getDeals()),
        flatMap(() => this.getPersons()),
      );
  }

  updateDeal(id: string, deal: Deal): Observable<{}> {
    this.deals.next(new Map(this.deals.getValue()).set(id, deal));
    return of({});
  }

  removeDeal(id: string): Observable<{}> {
    const map1 = new Map(this.deals.getValue());
    map1.delete(id);
    this.deals.next(map1);
    return of({});
  }

  getPersons(): Observable<Map<string, Person>> {
    return this.http
      .get<(Person & WithId)[]>(this.getPersonsUrl, this.accountIdParams())
      .pipe(flatMap(persons => {
        const newPersons = new Map<string, Person>();
        persons.forEach(person => newPersons.set(person.id, person));
        this.persons.next(newPersons);
        return this.persons;
      }));
  }

  addPerson(person: Person): Observable<{}> {
    return this.http
      .post<AddAnythingResponse>(this.addPersonUrl, AddPersonRequest.fromPerson(person, this.accountId))
      .pipe(flatMap(() => this.getPersons()));
  }

  updatePerson(id: string, person: Person): Observable<{}> {
    this.persons.next(new Map(this.persons.getValue()).set(id, person));
    return of({});
  }

  removePerson(id: string): Observable<{}> {
    const map1 = new Map(this.persons.getValue());
    map1.delete(id);
    this.persons.next(map1);
    return of({});
  }


  getTransfers(): Observable<Map<string, Transfer>> {
    return this.http
      .get<(Transfer & WithId)[]>(this.getTransfersUrl, this.accountIdParams())
      .pipe(flatMap(transfers => {
        const newTransfers = new Map<string, Transfer>();
        transfers.forEach(deal => newTransfers.set(deal.id, deal));
        this.transfers.next(newTransfers);
        return this.transfers;
      }));
  }

  addTransfer(transfer: Transfer): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    this.transfers.next(new Map(this.transfers.getValue()).set(id, transfer));
    return of({});
  }

  removeTransfer(id: string): Observable<{}> {
    const map1 = this.transfers.getValue();
    map1.delete(id);
    this.transfers.next(map1);
    return of({});
  }

  updateTransfer(id: string, transfer: Transfer): Observable<{}> {
    this.transfers.next(new Map(this.transfers.getValue()).set(id, transfer));
    return of({});
  }
}
