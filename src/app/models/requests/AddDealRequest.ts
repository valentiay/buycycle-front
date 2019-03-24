import {Deal, DealType} from '../Deal';

export class AddDealRequest {
  accountId: string;
  name: string;
  amount: number;
  members: string[];
  lender: string;
  type: DealType = DealType.OneForAll;

  constructor(accountId: string, name: string, price: number, members: Set<string>, lender: string, type: DealType) {
    this.accountId = accountId;
    this.name = name;
    this.amount = price;
    this.members = Array.from(members);
    this.lender = lender;
    this.type = type;
  }

  static fromDeal(deal: Deal, accountId: string): AddDealRequest {
    return new AddDealRequest(accountId, deal.name, deal.price, deal.members, deal.lender, deal.type);
  }
}
