import {Deal, DealType} from './Deal';

export class OneForAllDeal implements Deal {
  id: string;
  name: string;
  price: string;
  members: Set<string>;
  lender: string;
  type: DealType = DealType.OneForAll;

  constructor(id: string, name: string, price: string, members: Set<string>, lender: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.members = members;
    this.lender = lender;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new OneForAllDeal(other.id, other.name, other.price, other.members, '');
  }

  clone(): OneForAllDeal {
    return new OneForAllDeal(this.id, this.name, this.price, new Set(this.members), this.lender);
  }
}
