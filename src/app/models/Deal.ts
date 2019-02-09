import {Person} from './Person';

export class Deal {
  id: string;
  name: string;
  price: string;
  members: Map<string, Person>;
  debtors: Map<string, string[]>;

  constructor(id: string, name: string, price: string, members: Map<string, Person>, debtors: Map<string, string[]>) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.members = members;
    this.debtors = debtors;
  }
}
