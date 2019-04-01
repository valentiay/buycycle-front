import {Person} from '../Person';

export class BackendPerson {
  accountId: string;
  id: string;
  name: string;
  debtors: BackendDebtor[];
  lenders: BackendDebtor[];

  static toPerson(backendPerson: BackendPerson): Person {
    const borrowersMap = new Map<string, number>();
    if (backendPerson.debtors) {
      backendPerson.debtors.forEach(debtor => borrowersMap.set(debtor.name, debtor.amount));
    }
    const lendersMap = new Map<string, number>();
    if (backendPerson.lenders) {
      backendPerson.lenders.forEach(lender => lendersMap.set(lender.name, lender.amount));
    }
    return new Person(backendPerson.name, lendersMap, borrowersMap);
  }
}

class BackendDebtor {
  amount: number;
  name: string;
}
