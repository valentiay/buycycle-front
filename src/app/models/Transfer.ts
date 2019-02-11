export class Transfer {
  id: string;
  from: string;
  to: string;
  amount: string;

  constructor(id: string, from: string, to: string, amount: string) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
