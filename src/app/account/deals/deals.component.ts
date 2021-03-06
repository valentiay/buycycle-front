import {Component, OnInit} from '@angular/core';
import {DebtorDeal} from '../../models/DebtorDeal';
import {Deal, DealType} from '../../models/Deal';
import {Person} from '../../models/Person';
import {AccountService} from '../account.service';
import {OneForAllDeal} from '../../models/OneForAllDeal';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  dealType = DealType;

  newDeal: Deal;
  newDealType: DealType = DealType.OneForAll;
  deals: Map<string, Deal>;
  persons: Map<string, Person>;
  isEdited: boolean;
  isEditable: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.isEdited = false;
    this.accountService.getPersons().subscribe(persons => this.persons = persons);
    this.accountService.getDeals().subscribe(deals => this.deals = deals);
    this.accountService.isEditable().subscribe(isEditable => this.isEditable = isEditable);
  }

  // setNewDealType(type: DealType) {
  //   this.newDealType = type;
  //   switch (type) {
  //     case DealType.OneForAll: {
  //       this.newDeal = OneForAllDeal.fromOtherDeal(this.newDeal);
  //       break;
  //     }
  //     case DealType.Debtors: {
  //       this.newDeal = DebtorDeal.fromOtherDeal(this.newDeal);
  //       break;
  //     }
  //   }
  // }

  initEmptyDeal() {
    const members = new Set<string>();
    this.persons.forEach((person, id) => members.add(id));
    this.newDeal = new OneForAllDeal(null, null, members, null);
    this.isEdited = true;
  }

  addNewDeal() {
    const self = this;
    return () => self.accountService.addDeal(self.newDeal).subscribe(() => {
      self.isEdited = false;
      self.newDeal = undefined;
    });
  }

  clearDeal() {
    const self = this;
    return () => {
      self.isEdited = false;
      self.newDeal = undefined;
    };
  }
}
