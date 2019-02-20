import {Injectable} from '@angular/core';
import {DebtorDeal} from './models/DebtorDeal';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OneForAllDeal} from './models/OneForAllDeal';
import {Deal} from './models/Deal';
import {Person} from './models/Person';
import {Transfer} from './models/Transfer';

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

  constructor() {
    const members = new Set<string>(['12', '23', '14', '72', '73']);
    const debtors = new Map<string, Set<string>>();
    debtors.set('14', new Set(['12', '23']));
    this.deals.next(new Map<string, Deal>([
      ['1', new DebtorDeal('Makdak', '$300', new Set(members), debtors)],
      ['2', new OneForAllDeal('Burger King', '$150', new Set(members), '23')]
    ]));
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
    const map = new Map(this.deals.getValue());
    map.delete(id);
    this.deals.next(map);
    return of({});
  }


  getPersons(): Observable<Map<string, Person>> {
    return this.persons;
  }

  addPerson(person: Person): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    this.persons.next(new Map(this.persons.getValue()).set(id, person));
    return of({});
  }

  updatePerson(id: string, person: Person): Observable<{}> {
    this.persons.next(new Map(this.persons.getValue()).set(id, person));
    return of({});
  }

  removePerson(id: string): Observable<{}> {
    const map = new Map(this.persons.getValue());
    map.delete(id);
    this.persons.next(map);
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
    const map = this.transfers.getValue();
    map.delete(id);
    this.transfers.next(map);
    return of({});
  }

  updateTransfer(id: string, transfer: Transfer): Observable<{}> {
    this.transfers.next(new Map(this.transfers.getValue()).set(id, transfer));
    return of({});
  }
}
