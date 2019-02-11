import {Component, Input, OnInit} from '@angular/core';
import {OneForAllDeal} from '../models/OneForAllDeal';

@Component({
  selector: 'app-one-for-all-deal-form',
  templateUrl: './one-for-all-deal-form.component.html',
  styleUrls: ['./one-for-all-deal-form.component.css']
})
export class OneForAllDealFormComponent implements OnInit {

  @Input() deal: OneForAllDeal;

  constructor() { }

  ngOnInit() {
  }

  deleteMember(id: string) {
    if (id === this.deal.lender) {
      alert('Вы пытаетесь удалить человека, который платит');
    } else {
      this.deal.members.delete(id);
    }
  }
}
