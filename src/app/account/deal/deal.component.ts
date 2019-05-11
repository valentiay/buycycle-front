import {Component, Input} from '@angular/core';
import {Deal, DealType} from '../../models/Deal';
import {Person} from '../../models/Person';
import {KeyValue} from '@angular/common';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  dealType = DealType;

  @Input() deal: KeyValue<string, Deal>;
  @Input() persons: Map<string, Person>;

  editedDeal: Deal;
  isEdited = false;

  constructor(private accountService: AccountService) {
  }

  remove() {
    this.accountService.removeDeal(this.deal.key).subscribe();
  }

  edit() {
    this.editedDeal = this.deal.value.clone();
    this.isEdited = true;
  }

  cancel() {
    const self = this;
    return () => {
      self.isEdited = false;
      self.editedDeal = undefined;
    };
  }

  submit() {
    const self = this;
    return () => self.accountService.updateDeal(self.deal.key, self.editedDeal).subscribe(() => {
      self.deal.value = self.editedDeal;
      self.isEdited = false;
      self.editedDeal = undefined;
    });
  }
}
