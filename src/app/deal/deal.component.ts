import {Component, Input} from '@angular/core';
import {Deal, DealType} from '../models/Deal';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent {

  dealType = DealType;

  @Input() deal: Deal;

  constructor() {}
}
