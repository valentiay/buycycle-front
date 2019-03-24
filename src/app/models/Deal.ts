export interface Deal {
  name: string;
  price: number;
  type: DealType;
  members: Set<string>;
  clone(): Deal;
}

export enum DealType {
  OneForAll = 'OneForAll',
  Debtors = 'Debtors',
  Unequal = 'Unequal',
}
