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
  @Input() update: () => void;
  @Input() reset: () => void;
  persons: Map<string, Person>;

  private mainErrorTexts: string[];
  private lenderErrorTexts: string[];

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

  validateAndUpdate() {
    this.mainErrorTexts = [];
    this.lenderErrorTexts = [];
    if (!this.deal.name) {
      this.mainErrorTexts.push('Не введено название покупки');
    }
    if (!this.deal.amount) {
      this.mainErrorTexts.push('Не введена стоимость покупки');
    } else if (this.deal.amount < 0) {
      this.mainErrorTexts.push('Введена отрицательная стоимость покупки');
    }
    if (!this.deal.lender) {
      this.lenderErrorTexts.push('Не задан человек, который платит за всех');
    }
    if (this.deal.members.size === 0) {
      this.lenderErrorTexts.push('Список людей, участвующих в покупке пуст');
    }

    if (this.lenderErrorTexts.length === 0 && this.mainErrorTexts.length === 0) {
      this.update();
    }
  }
}
