import {Person} from '../Person';

export class AddPersonRequest {
  accountId: string;
  name: string;

  private constructor(name: string, accountId: string) {
    this.name = name;
    this.accountId = accountId;
  }

  static fromPerson(person: Person, accountId): AddPersonRequest {
    return new AddPersonRequest(person.name, accountId);
  }
}
