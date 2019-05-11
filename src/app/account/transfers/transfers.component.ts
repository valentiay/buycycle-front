import {Component, OnInit} from '@angular/core';
import {Transfer} from '../../models/Transfer';
import {Person} from '../../models/Person';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {


  transfers: Map<string, Transfer>;
  persons: Map<string, Person>;
  newTransfer: Transfer;
  errorTexts: string[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.errorTexts = [];
    this.getPersons();
    this.getTransfers();
  }

  getPersons() {
    this.accountService.getPersons().subscribe(persons => this.persons = persons);
  }

  getTransfers() {
    this.accountService.getTransfers().subscribe(transfers => this.transfers = transfers);
  }

  initEmptyTransfer() {
    this.errorTexts = [];
    this.newTransfer = new Transfer(null, null, null);
  }

  addNewTransfer() {
    this.errorTexts = [];
    if (!this.newTransfer.amount) {
      this.errorTexts.push('Не указана сумма перевода');
    } else if (this.newTransfer.amount < 0) {
      this.errorTexts.push('Указана отрицательная сумма перевода');
    }
    if (!this.newTransfer.sender) {
      this.errorTexts.push('Не указан отправитель перевода');
    } else if (this.newTransfer.sender === this.newTransfer.receiver) {
      this.errorTexts.push('Отправитель и получатель совпадают');
    }
    if (!this.newTransfer.receiver) {
      this.errorTexts.push('Не указан получатель перевода');
    }
    if (this.errorTexts.length === 0) {
      this.accountService.addTransfer(this.newTransfer).subscribe(this.newTransfer = undefined);
    }
  }

  clearTransfer() {
    this.newTransfer = undefined;
  }

}
