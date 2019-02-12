import { Component, OnInit } from '@angular/core';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Map<string, Person>;
  newPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

  initEmptyPerson() {
    this.newPerson = new Person('', '');
  }

  addNewPerson() {
    this.personService.addPerson(this.newPerson).subscribe(() => {
      this.newPerson = undefined;
      this.getPersons();
    });
  }

  clearPerson() {
    this.newPerson = undefined;
  }

  deletePerson(id: string) {
    this.personService.deletePerson(id).subscribe(() => this.getPersons());
  }
}
