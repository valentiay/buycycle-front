import {Person} from './Person';

export interface Deal {
  id: string;
  name: string;
  price: string;
  type: DealType;
  members: Map<string, Person>;
}

export enum DealType {
  OneForAll,
  Debtors,
  Unequal,
}
