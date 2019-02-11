export interface Deal {
  id: string;
  name: string;
  price: string;
  type: DealType;
  members: Set<string>;
}

export enum DealType {
  OneForAll,
  Debtors,
  Unequal,
}
