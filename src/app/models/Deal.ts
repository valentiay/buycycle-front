export interface Deal {
  id: string;
  name: string;
  price: string;
  type: DealType;
  members: Set<string>;
  clone(): Deal;
}

export enum DealType {
  OneForAll,
  Debtors,
  Unequal,
}
