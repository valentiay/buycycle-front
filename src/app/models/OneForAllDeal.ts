import {Deal, DealType} from './Deal';

export class OneForAllDeal implements Deal {
  name: string;
  amount: number;
  members: Set<string>;
  lender: string;
  type: DealType = DealType.OneForAll;

  constructor(name: string, amount: number, members: Set<string>, lender: string) {
    this.name = name;
    this.amount = amount;
    this.members = members;
    this.lender = lender;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new OneForAllDeal(other.name, other.amount, other.members, null);
  }

  clone(): OneForAllDeal {
    return new OneForAllDeal(this.name, this.amount, new Set(this.members), this.lender);
  }
}
