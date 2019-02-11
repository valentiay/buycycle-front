import {Component, Input, OnInit} from '@angular/core';
import {Deal} from "../models/Deal";

@Component({
  selector: 'app-deal-form',
  templateUrl: './deal-form.component.html',
  styleUrls: ['./deal-form.component.css']
})
export class DealFormComponent implements OnInit {

  @Input() deal: Deal;
  activeLender: string;

  constructor() { }

  ngOnInit() {
  }

  toggleBorrowerList(lender: string) {
    if (this.activeLender === lender) {
      this.activeLender = undefined;
    } else {
      this.activeLender = lender;
    }
  }

  addBorrower(lender: string, borrower: string) {
    if (this.deal.debtors.has(lender)) {
      this.deal.debtors.get(lender).push(borrower);
    } else {
      this.deal.debtors.set(lender, [borrower]);
    }
  }
}
