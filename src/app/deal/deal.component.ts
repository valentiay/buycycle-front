import {Component, Input} from '@angular/core';
import {Deal, DealType} from '../models/Deal';
import {Person} from '../models/Person';
import {KeyValue} from '@angular/common';
import {DealService} from "../deal.service";

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

  constructor(private dealService: DealService) {
  }

  remove() {
    this.dealService.remove(this.deal.key);
  }

  edit() {
    this.editedDeal = this.deal.value.clone();
    this.isEdited = true;
  }

  cancel() {
    this.editedDeal = undefined;
    this.isEdited = false;
  }

  submit() {
    this.dealService.updateDeal(this.deal.key, this.editedDeal).subscribe(() => {
      this.deal.value = this.editedDeal;
      this.isEdited = false;
      this.editedDeal = undefined;
    });
  }
}
