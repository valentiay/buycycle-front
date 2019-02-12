import { Component, OnInit } from '@angular/core';
import {PersonService} from '../person.service';
import {Person} from '../models/Person';

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss']
})
export class DebtorsComponent implements OnInit {

  persons: Map<string, Person>;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

}
