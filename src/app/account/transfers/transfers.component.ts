import {Component, OnInit} from '@angular/core';
import {Transfer} from '../models/Transfer';
import {Person} from '../models/Person';
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

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
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
    this.newTransfer = new Transfer('', '', '');
  }

  addNewTransfer() {
    this.accountService.addTransfer(this.newTransfer).subscribe(this.newTransfer = undefined);
  }

  clearTransfer() {
    this.newTransfer = undefined;
  }

}