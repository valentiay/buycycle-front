import {Component, OnInit} from '@angular/core';
import {Deal} from '../models/Deal';
import {Person} from '../models/Person';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  deals: Deal[];

  constructor() {
  }

  ngOnInit() {
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
    this.deals = [new Deal('1', 'Makdak', '$300', members, debtors)];
  }

}
