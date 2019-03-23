import {Component, Input, OnInit} from '@angular/core';
import {DebtorDeal} from '../../models/DebtorDeal';
import {Person} from '../../models/Person';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-debtor-deal-form',
  templateUrl: './debtor-deal-form.component.html',
  styleUrls: ['./debtor-deal-form.component.scss']
})
export class DebtorDealFormComponent implements OnInit {

  @Input() deal: DebtorDeal;
  persons: Map<string, Person>;
  activeLender: string;

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

  addMember(id: string) {
    this.deal.members.add(id);
  }

  deleteMember(member: string) {
    this.deal.debtors.delete(member);
    this.deal.members.delete(member);
  }

  notMembers(): Map<string, Person> {
    const notMembers = new Map<string, Person>();
    this.persons.forEach((value, key) => {
      if (!this.deal.members.has(key)) {
        notMembers.set(key, value);
      }
    });
    return notMembers;
  }
}
