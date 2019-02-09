import { Injectable } from '@angular/core';
import {Person} from './models/Person';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  private persons: Person[] = [
    new Person('Сашка', '12'),
    new Person('Димка', '23'),
    new Person('Васька', '14'),
    new Person('Петька', '72'),
    new Person('Сережка', '73')
  ];

  getPersons(): Observable<Person[]> {
    return of(this.persons.map(p => ({...p})));
  }

  addPerson(person: Person): Observable<{}> {
    this.persons.push(person);
    return of({});
  }

  deletePerson(person: Person): Observable<{}> {
    this.persons = this.persons.filter(oldPerson => oldPerson.id !== person.id);
    return of({});
  }
}
