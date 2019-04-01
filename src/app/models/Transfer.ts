export class Transfer {
  sender: string;
  receiver : string;
  amount: number;

  constructor(from: string, to: string, amount: number) {
    this.sender = from;
    this.receiver = to;
    this.amount = amount;
  }
}
