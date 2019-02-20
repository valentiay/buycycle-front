import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../models/Person';
import {AccountService} from '../account.service';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: KeyValue<string, Person>;

  isEdited = false;
  editedPerson: Person;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  edit() {
    this.editedPerson = new Person(this.person.value.name);
    this.isEdited = true;
  }

  cancel() {
    this.isEdited = false;
    this.editedPerson = undefined;
  }

  submit() {
    this.accountService.updatePerson(this.person.key, this.editedPerson).subscribe(() => {
      this.person.value = this.editedPerson;
      this.isEdited = false;
      this.editedPerson = undefined;
    });
  }
}
