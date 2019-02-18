import {Injectable} from '@angular/core';
import {DebtorDeal} from './models/DebtorDeal';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OneForAllDeal} from './models/OneForAllDeal';
import {Deal} from './models/Deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  deals: BehaviorSubject<Map<string, Deal>> = new BehaviorSubject(new Map());

  constructor() {
    const members = new Set<string>(['12', '23', '14', '72', '73']);
    const debtors = new Map<string, Set<string>>();
    debtors.set('14', new Set(['12', '23']));
    this.deals.next(new Map<string, Deal>([
      ['1', new DebtorDeal('1', 'Makdak', '$300', members, debtors)],
      ['2', new OneForAllDeal('2', 'Burger King', '$150', members, '23')]
    ]));
  }

  getDeals(): Observable<Map<string, Deal>> {
    return this.deals;
  }

  addDeal(deal: Deal): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    deal.id = id;
    this.deals.next(new Map(this.deals.getValue()).set(id, deal));
    return of({});
  }

  updateDeal(id: string, deal: Deal): Observable<{}> {
    this.deals.next(this.deals.getValue().set(id, deal));
    return of({});
  }

  remove(id: string): Observable<{}> {
    const map = this.deals.getValue();
    map.delete(id);
    this.deals.next(map);
    return of({});
  }
}
