import {Component, Input, OnInit} from '@angular/core';
import {Transfer} from '../../models/Transfer';
import {AccountService} from '../account.service';
import {Person} from '../../models/Person';
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
  errorTexts: string[] = [];
  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.errorTexts = [];
  }

  remove(id: string) {
    this.accountService.removeTransfer(id).subscribe();
  }

  edit() {
    this.editedTransfer = new Transfer(this.transfer.value.sender, this.transfer.value.receiver, this.transfer.value.amount);
    this.errorTexts = [];
    this.isEdited = true;
  }

  cancel() {
    this.isEdited = false;
    this.editedTransfer = undefined;
  }

  submit() {
    this.errorTexts = [];
    if (!this.editedTransfer.amount) {
      this.errorTexts.push('Не указана сумма перевода');
    } else if (this.editedTransfer.amount < 0) {
      this.errorTexts.push('Указана отрицательная сумма перевода');
    }
    if (!this.editedTransfer.sender) {
      this.errorTexts.push('Не указан отправитель перевода');
    }
    if (!this.editedTransfer.receiver) {
      this.errorTexts.push('Не указан получатель перевода');
    }
    if (this.errorTexts.length === 0) {
      this.accountService.updateTransfer(this.transfer.key, this.editedTransfer).subscribe(() => {
        this.transfer.value = this.editedTransfer;
        this.isEdited = false;
        this.editedTransfer = undefined;
      });
    }
  }
}
