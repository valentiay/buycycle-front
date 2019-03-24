import {Deal, DealType} from './Deal';

export class OneForAllDeal implements Deal {
  name: string;
  price: number;
  members: Set<string>;
  lender: string;
  type: DealType = DealType.OneForAll;

  constructor(name: string, price: number, members: Set<string>, lender: string) {
    this.name = name;
    this.price = price;
    this.members = members;
    this.lender = lender;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new OneForAllDeal(other.name, other.price, other.members, '');
  }

  clone(): OneForAllDeal {
    return new OneForAllDeal(this.name, this.price, new Set(this.members), this.lender);
  }
}
