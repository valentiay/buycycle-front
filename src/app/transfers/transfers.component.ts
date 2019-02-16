import {Component, OnInit} from '@angular/core';
import {Transfer} from '../models/Transfer';
import {Person} from '../models/Person';
import {PersonService} from '../person.service';
import {TransferService} from '../transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {


  transfers: Map<string, Transfer>;
  persons: Map<string, Person>;
  newTransfer: Transfer;

  constructor(private personService: PersonService, private transferService: TransferService) {
  }

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

}
