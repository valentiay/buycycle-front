import { Component, OnInit } from '@angular/core';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[];
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
    this.newPerson.id = this.persons[this.persons.length - 1].id + 1;
    this.personService.addPerson(this.newPerson).subscribe(() => {
      this.newPerson = undefined;
      this.getPersons();
    });
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person).subscribe(() => this.getPersons());
  }
}
