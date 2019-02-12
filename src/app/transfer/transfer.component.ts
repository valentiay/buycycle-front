import { Component, OnInit } from '@angular/core';
import {Transfer} from '../models/Transfer';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';
import {TransferService} from '../transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transfers: Map<string, Transfer>;
  persons: Map<string, Person>;
  newTransfer: Transfer;

  constructor(private personService: PersonService, private transferService: TransferService) { }

  ngOnInit() {
    this.getPersons();
    this.getTransfers();
  }

  getPersons() {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

  getTransfers() {
    this.transferService.getTransfers().subscribe(transfers => this.transfers = transfers);
  }

  initEmptyTransfer() {
    this.newTransfer = new Transfer('', '', '', '');
  }

  addNewTransfer() {
    this.transferService.addTransfer(this.newTransfer).subscribe(this.newTransfer = undefined);
  }

  clearTransfer() {
    this.newTransfer = undefined;
  }

  deleteTransfer(id: string) {
    this.transferService.deleteTransfer(id).subscribe(() => this.getTransfers());
  }
}
