import { Injectable } from '@angular/core';
import {Person} from './models/Person';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  private persons: Map<string, Person> = new Map([
    ['12', new Person('Сашка', '12', new Map([['23', '$100']]), new Map())],
    ['23', new Person('Димка', '23', new Map(), new Map([['12', '$100']]))],
    ['14', new Person('Васька', '14')],
    ['72', new Person('Петька', '72')],
    ['73', new Person('Сережка', '73')],
  ]);

  getPersons(): Observable<Map<string, Person>> {
    return of(this.persons);
  }

  addPerson(person: Person): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    person.id = id;
    this.persons.set(id, person);
    return of({});
  }

  deletePerson(id: string): Observable<{}> {
    this.persons.delete(id);
    return of({});
  }
}
