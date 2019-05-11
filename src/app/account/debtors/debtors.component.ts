import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Person} from '../../models/Person';
import {Transfer} from '../../models/Transfer';

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss']
})
export class DebtorsComponent implements OnInit {

  persons: Map<string, Person>;
  newPerson: Person;
  errorText: string;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.accountService.getPersons().subscribe(persons => {
      this.persons = persons;
    });
  }

  addTransfer(from: string, to: string, amount: number) {
    this.accountService.addTransfer(new Transfer(from, to, amount)).subscribe();
  }

  initEmptyPerson() {
    this.errorText = undefined;
    this.newPerson = new Person(null);
  }

  addNewPerson() {
    if (!this.newPerson.name) {
      this.errorText = 'Не введено имя';
    } else {
      this.accountService
        .addPerson(this.newPerson)
        .subscribe(() => this.newPerson = undefined);
    }
  }

  clearPerson() {
    this.newPerson = undefined;
  }
}
