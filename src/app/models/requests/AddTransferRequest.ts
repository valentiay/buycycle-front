import {Transfer} from '../Transfer';

export class AddTransferRequest {
  accountId: string;
  sender: string;
  receiver: string;
  amount: number;

  private constructor(accountId: string, sender: string, receiver: string, amount: number) {
    this.accountId = accountId;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
  }

  static fromTransfer(transfer: Transfer, accountId: string) {
    return new AddTransferRequest(accountId, transfer.sender, transfer.receiver, transfer.amount);
  }
}
