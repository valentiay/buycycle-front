import {Component, Input, OnInit} from '@angular/core';
import {OneForAllDeal} from '../../models/OneForAllDeal';
import {Person} from '../../models/Person';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-one-for-all-deal-form',
  templateUrl: './one-for-all-deal-form.component.html',
  styleUrls: ['./one-for-all-deal-form.component.scss']
})
export class OneForAllDealFormComponent implements OnInit {

  @Input() deal: OneForAllDeal;
  persons: Map<string, Person>;

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

  addMember(id: string) {
    this.deal.members.add(id);
  }

  deleteMember(id: string) {
    this.deal.members.delete(id);
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
