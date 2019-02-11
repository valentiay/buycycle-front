import {Deal, DealType} from './Deal';

export class DebtorDeal implements Deal {
  id: string;
  name: string;
  price: string;
  members: Set<string>;
  debtors: Map<string, Set<string>>;
  type: DealType = DealType.Debtors;

  constructor(id: string, name: string, price: string, members: Set<string>, debtors: Map<string, Set<string>>) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.members = members;
    this.debtors = debtors;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new DebtorDeal(other.id, other.name, other.price, other.members, new Map());
  }

  notDebtors(): Set<string> {
    const members = new Set<string>(this.members);
    this.debtors.forEach((borrowers, lender) => {
      members.delete(lender);
      borrowers.forEach(borrower => members.delete(borrower));
    });
    return members;
  }

  notBorrowers(): Set<string> {
    const members = new Set<string>(this.members);
    this.debtors.forEach(borrowers => {
      borrowers.forEach(borrower => members.delete(borrower));
    });
    return members;
  }
}
