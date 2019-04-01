import {Deal, DealType} from './Deal';

export class DebtorDeal implements Deal {
  name: string;
  amount: number;
  members: Set<string>;
  debtors: Map<string, Set<string>>;
  type: DealType = DealType.Debtors;

  constructor(name: string, amount: number, members: Set<string>, debtors: Map<string, Set<string>>) {
    this.name = name;
    this.amount = amount;
    this.members = members;
    this.debtors = debtors;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new DebtorDeal(other.name, other.amount, other.members, new Map());
  }

  clone(): DebtorDeal {
    const debtors = new Map<string, Set<string>>();
    this.debtors.forEach((value, key) => debtors.set(key, new Set(value)));
    return new DebtorDeal(this.name, this.amount, new Set(this.members), debtors);
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
