import {Injectable} from '@angular/core';
import {DebtorDeal} from '../models/DebtorDeal';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OneForAllDeal} from '../models/OneForAllDeal';
import {Deal} from '../models/Deal';
import {Person} from '../models/Person';
import {Transfer} from '../models/Transfer';
import {Account} from '../models/Account';
import {HttpClient, HttpEventType, HttpParams, HttpRequest} from '@angular/common/http';
import {AddPersonRequest} from '../models/requests/AddPersonRequest';
import {AddAnythingResponse} from '../models/responses/AddAnythingResponse';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private deals: BehaviorSubject<Map<string, Deal>> = new BehaviorSubject(new Map());
  private persons: BehaviorSubject<Map<string, Person>> = new BehaviorSubject(new Map([
    ['12', new Person('Сашка', new Map([['23', '$100']]), new Map())],
    ['23', new Person('Димка', new Map(), new Map([['12', '$100']]))],
    ['14', new Person('Васька')],
    ['72', new Person('Петька')],
    ['73', new Person('Сережка')],
  ]));
  private transfers: BehaviorSubject<Map<string, Transfer>> = new BehaviorSubject(new Map<string, Transfer>([
    ['1', new Transfer('12', '23', '$100')],
    ['2', new Transfer('23', '73', '$200')],
  ]));
  private accountId: string;

  constructor(private http: HttpClient) {
    const members = new Set<string>(['12', '23', '14', '72', '73']);
    const debtors = new Map<string, Set<string>>();
    debtors.set('14', new Set(['12', '23']));
    this.deals.next(new Map<string, Deal>([
      ['1', new DebtorDeal('Makdak', '$300', new Set(members), debtors)],
      ['2', new OneForAllDeal('Burger King', '$150', new Set(members), '23')]
    ]));
  }

  private getAccountUrl = 'http://80.240.31.209:8000/api/getAccount';
  private addPersonUrl = 'http://80.240.31.209:8000/api/addPerson';

  setAccount(id: string): Observable<Account> {
    this.accountId = id;
    const options = {params: new HttpParams().set('id', '3')};
    return this.http.request<Account>(new HttpRequest('GET', this.getAccountUrl, options)).pipe(map(event => {
      if (event.type === HttpEventType.Response) {
        return event.body;
      }
    }));
  }

  getDeals(): Observable<Map<string, Deal>> {
    return this.deals;
  }

  addDeal(deal: Deal): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    this.deals.next(new Map(this.deals.getValue()).set(id, deal));
    return of({});
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
    return this.persons;
  }

  addPerson(person: Person): Observable<{}> {
    return this.http.post<AddAnythingResponse>(this.addPersonUrl, AddPersonRequest.fromPerson(person, this.accountId));
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
    return this.transfers;
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
