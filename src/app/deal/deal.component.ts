import {Component, Input} from '@angular/core';
import {Deal} from '../models/Deal';
import {Person} from '../models/Person';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent {

  @Input() deal: Deal;

  constructor() { }

  notDebtors(): Map<string, Person> {
    console.log('call');
    const members = new Map<string, Person>(this.deal.members);
    this.deal.debtors.forEach((borrowers, lender) => {
      members.delete(lender);
      borrowers.forEach(borrower => members.delete(borrower));
    });
    return members;
  }
}
