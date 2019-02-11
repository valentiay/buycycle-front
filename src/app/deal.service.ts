import {Injectable} from '@angular/core';
import {DebtorDeal} from './models/DebtorDeal';
import {Person} from './models/Person';
import {Observable, of} from 'rxjs';
import {OneForAllDeal} from './models/OneForAllDeal';
import {Deal} from './models/Deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  deals: Deal[];

  constructor() {
    const members = new Map<string, Person>();
    const persons = [
      new Person('Сашка', '12'),
      new Person('Димка', '23'),
      new Person('Васька', '14'),
      new Person('Петька', '72'),
      new Person('Сережка', '73')
    ];
    persons.forEach(person => members.set(person.id, person));
    const debtors = new Map<string, string[]>();
    debtors.set('14', ['12', '23']);
    this.deals = [
      new DebtorDeal('1', 'Makdak', '$300', members, debtors),
      new OneForAllDeal('2', 'Burger King', '$150', members, '23')
    ];
  }

  getDeals(): Observable<Deal[]> {
    return of(this.deals);
  }

  addDeal(deal: Deal): Observable<{}> {
    this.deals.push(deal);
    return of({});
  }
}
