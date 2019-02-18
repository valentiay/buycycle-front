import { Component, OnInit } from '@angular/core';
import {Person} from '../models/Person';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Map<string, Person>;
  newPerson: Person;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.accountService.getPersons().subscribe(persons => this.persons = persons);
  }

  initEmptyPerson() {
    this.newPerson = new Person('', '');
  }

  addNewPerson() {
    this.accountService.addPerson(this.newPerson).subscribe(() => {
      this.newPerson = undefined;
      this.getPersons();
    });
  }

  clearPerson() {
    this.newPerson = undefined;
  }

  deletePerson(id: string) {
    this.accountService.deletePerson(id).subscribe(() => this.getPersons());
  }
}
