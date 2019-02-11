import {Injectable} from '@angular/core';
import {Transfer} from './models/Transfer';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  transfers: Map<string, Transfer> = new Map<string, Transfer>([
    ['1', new Transfer('1', '12', '23', '$100')],
    ['2', new Transfer('2', '23', '73', '$200')],
  ]);

  constructor() {
  }

  getTransfers(): Observable<Map<string, Transfer>> {
    return of(this.transfers);
  }

  addTransfer(transfer: Transfer): Observable<{}> {
    const id = (Math.floor(1000 * Math.random())).toString();
    transfer.id = id;
    this.transfers.set(id, transfer);
    return of({});
  }
}
