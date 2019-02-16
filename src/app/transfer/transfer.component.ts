import {Component, Input, OnInit} from '@angular/core';
import {Transfer} from '../models/Transfer';
import {TransferService} from '../transfer.service';
import {Person} from '../models/Person';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @Input() transfer: KeyValue<string, Transfer>;
  @Input() persons: Map<string, Person>;

  constructor(private transferService: TransferService) {
  }

  ngOnInit() {
  }

  deleteTransfer(id: string) {
    this.transferService.deleteTransfer(id);
  }
}
