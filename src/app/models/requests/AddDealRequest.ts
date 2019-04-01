import {Deal, DealType} from '../Deal';
import {OneForAllDeal} from '../OneForAllDeal';

export class AddDealRequest {
  accountId: string;
  name: string;
  amount: number;
  members: string[];
  lender: string;
  type: DealType = DealType.OneForAll;

  private constructor(accountId: string, name: string, price: number, members: Set<string>, lender: string, type: DealType) {
    this.accountId = accountId;
    this.name = name;
    this.amount = price;
    this.members = Array.from(members);
    this.lender = lender;
    this.type = type;
  }

  static fromDeal(deal: Deal, accountId: string): AddDealRequest {
    const oneForAllDeal = deal as OneForAllDeal;
    return new AddDealRequest(
      accountId,
      oneForAllDeal.name,
      oneForAllDeal.amount,
      oneForAllDeal.members,
      oneForAllDeal.lender,
      oneForAllDeal.type
    );
  }
}
