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
  deals: Map<string, Deal>;

  constructor() {
    const members = new Set<string>(['12', '23', '14', '72', '73']);
    const debtors = new Map<string, Set<string>>();
    debtors.set('14', new Set(['12', '23']));
    this.deals = new Map<string, Deal>([
      ['1', new DebtorDeal('1', 'Makdak', '$300', members, debtors)],
      ['2', new OneForAllDeal('2', 'Burger King', '$150', members, '23')]
    ]);
  }

  getDeals(): Observable<Map<string, Deal>> {
    return of(this.deals);
  }

  addDeal(deal: Deal): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    deal.id = id;
    this.deals.set(id, deal);
    return of({});
  }
}
