import {Component, Input} from '@angular/core';
import {Deal} from '../models/Deal';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent {

  @Input() deal: Deal;

  constructor() {}
}
