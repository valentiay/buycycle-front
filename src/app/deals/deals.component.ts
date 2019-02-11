import {Component, OnInit} from '@angular/core';
import {Deal} from '../models/Deal';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';
import {DealService} from '../deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  deals: Deal[];
  newDeal: Deal;
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
    this.dealService.getDeals().subscribe(deals => this.deals = deals)
  }

  initEmptyDeal() {
    const members = new Map<string, Person>();
    this.persons.forEach(person => members.set(person.id, person));
    this.newDeal = new Deal('1', '', '', members, new Map());
  }

  addNewDeal() {
    this.dealService.addDeal(this.newDeal).subscribe(() => this.newDeal = undefined);
  }

  clearDeal() {
    this.newDeal = undefined;
  }
}
