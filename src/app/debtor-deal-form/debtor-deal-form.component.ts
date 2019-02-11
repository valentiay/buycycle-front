import {Component, Input, OnInit} from '@angular/core';
import {DebtorDeal} from '../models/DebtorDeal';

@Component({
  selector: 'app-debtor-deal-form',
  templateUrl: './debtor-deal-form.component.html',
  styleUrls: ['./debtor-deal-form.component.css']
})
export class DebtorDealFormComponent implements OnInit {

  @Input() deal: DebtorDeal;
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
      this.deal.debtors.get(lender).add(borrower);
    } else {
      this.deal.debtors.set(lender, new Set([borrower]));
    }
  }

  deleteBorrower(lender: string, borrower: string) {
    this.deal.debtors.get(lender).delete(borrower);
    if (this.deal.debtors.get(lender).size === 0) {
      this.deal.debtors.delete(lender);
    }
  }

  deleteMember(member: string) {
    this.deal.debtors.delete(member);
    this.deal.members.delete(member);
  }
}
