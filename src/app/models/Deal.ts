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

  notDebtors(): Map<string, Person> {
    const members = new Map<string, Person>(this.members);
    this.debtors.forEach((borrowers, lender) => {
      members.delete(lender);
      borrowers.forEach(borrower => members.delete(borrower));
    });
    return members;
  }

  notBorrowers(): Map<string, Person> {
    const members = new Map<string, Person>(this.members);
    this.debtors.forEach(borrowers => {
      borrowers.forEach(borrower => members.delete(borrower));
    });
    return members;
  }
}
