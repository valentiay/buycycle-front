import {Component, OnInit} from '@angular/core';
import {DebtorDeal} from '../../models/DebtorDeal';
import {Deal, DealType} from '../../models/Deal';
import {Person} from '../../models/Person';
import {AccountService} from '../account.service';
import {OneForAllDeal} from '../../models/OneForAllDeal';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  dealType = DealType;

  newDeal: Deal;
  newDealType: DealType = DealType.OneForAll;
  deals: Map<string, Deal>;
  persons: Map<string, Person>;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getPersons();
    this.getDeals();
  }

  getPersons() {
    this.accountService.getPersons().subscribe(persons => this.persons = persons);
  }

  getDeals() {
    this.accountService.getDeals().subscribe(deals => this.deals = deals);
  }

  setNewDealType(type: DealType) {
    this.newDealType = type;
    switch (type) {
      case DealType.OneForAll: {
        this.newDeal = OneForAllDeal.fromOtherDeal(this.newDeal);
        break;
      }
      case DealType.Debtors: {
        this.newDeal = DebtorDeal.fromOtherDeal(this.newDeal);
        break;
      }
    }
  }

  initEmptyDeal() {
    const members = new Set<string>();
    this.persons.forEach((person, id) => members.add(id));
    this.newDeal = new OneForAllDeal('', 0, members, '');
  }

  addNewDeal() {
    this.accountService.addDeal(this.newDeal).subscribe(() => this.newDeal = undefined);
  }

  clearDeal() {
    this.newDeal = undefined;
  }
}
