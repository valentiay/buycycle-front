import {Deal, DealType} from './Deal';
import {Person} from './Person';

export class OneForAllDeal implements Deal {
  id: string;
  name: string;
  price: string;
  members: Map<string, Person>;
  lender: string;
  type: DealType = DealType.OneForAll;

  constructor(id: string, name: string, price: string, members: Map<string, Person>, lender: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.members = members;
    this.lender = lender;
  }

  static fromOtherDeal(other: Deal): Deal {
    return new OneForAllDeal(other.id, other.name, other.price, other.members, '');
  }
}
