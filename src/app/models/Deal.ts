import {WithId} from './responses/WithId';
import {DebtorDeal} from './DebtorDeal';
import {OneForAllDeal} from './OneForAllDeal';

export interface Deal {
  name: string;
  amount: number;
  type: DealType;
  members: Set<string>;
  clone(): Deal;
}

export class DealOperations {
  static parseDeal(deal: (Deal & WithId)) {
    switch (deal.type) {
      case DealType.Debtors: {
        const casted = deal as unknown as DebtorDeal;
        return new DebtorDeal(casted.name, casted.amount, casted.members, casted.debtors);
      }
      case DealType.OneForAll: {
        const casted = deal as unknown as OneForAllDeal;
        return new OneForAllDeal(casted.name, casted.amount, casted.members, casted.lender);
      }
    }
  }
}

export enum DealType {
  OneForAll = 'OneForAll',
  Debtors = 'Debtors',
  Unequal = 'Unequal',
}
