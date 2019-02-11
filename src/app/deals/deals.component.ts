import {Component, OnInit} from '@angular/core';
import {DebtorDeal} from '../models/DebtorDeal';
import {Deal, DealType} from '../models/Deal';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';
import {DealService} from '../deal.service';
import {OneForAllDeal} from '../models/OneForAllDeal';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  dealType = DealType;

  deals: Deal[];
  newDeal: Deal;
  newDealType: DealType = DealType.OneForAll;
  persons: Person[];

  constructor(private personService: PersonService, private dealService: DealService) {
  }

  ngOnInit() {
    this.getPersons();
    this.getDeals();
  }

  getPersons() {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

  getDeals() {
    this.dealService.getDeals().subscribe(deals => this.deals = deals);
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
    const members = new Map<string, Person>();
    this.persons.forEach(person => members.set(person.id, person));
    this.newDealType = DealType.OneForAll;
    this.newDeal = new OneForAllDeal('1', '', '', members, '');
  }

  addNewDeal() {
    this.dealService.addDeal(this.newDeal).subscribe(() => this.newDeal = undefined);
  }

  clearDeal() {
    this.newDeal = undefined;
  }
}
