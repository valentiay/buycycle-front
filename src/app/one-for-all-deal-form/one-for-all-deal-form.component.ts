import {Component, Input, OnInit} from '@angular/core';
import {OneForAllDeal} from '../models/OneForAllDeal';
import {Person} from '../models/Person';
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
      console.log('updated');
    });
  }

  deleteMember(id: string) {
    if (id === this.deal.lender) {
      alert('Вы пытаетесь удалить человека, который платит');
    } else {
      this.deal.members.delete(id);
    }
  }
}
