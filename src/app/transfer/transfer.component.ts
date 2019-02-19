import {Component, Input, OnInit} from '@angular/core';
import {Transfer} from '../models/Transfer';
import {AccountService} from '../account.service';
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

  isEdited = false;
  editedTransfer: Transfer;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  remove(id: string) {
    this.accountService.removeTransfer(id);
  }

  edit() {
    this.editedTransfer = new Transfer(this.transfer.value.from, this.transfer.value.to, this.transfer.value.amount);
    this.isEdited = true;
  }

  cancel() {
    this.isEdited = false;
    this.editedTransfer = undefined;
  }

  submit() {
    this.accountService.updateTransfer(this.transfer.key, this.editedTransfer).subscribe(() => {
      this.transfer.value = this.editedTransfer;
      this.isEdited = false;
      this.editedTransfer = undefined;
    });
  }
}
