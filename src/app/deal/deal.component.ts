import {Component, Input} from '@angular/core';
import {Deal, DealType} from '../models/Deal';
import {Person} from '../models/Person';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  dealType = DealType;

  @Input() deal: Deal;
  @Input() persons: Map<string, Person>;

  constructor() {}
}
