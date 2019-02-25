import {NgModule} from '@angular/core';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DealsComponent} from './deals/deals.component';
import {DealComponent} from './deal/deal.component';
import {DebtorDealFormComponent} from './debtor-deal-form/debtor-deal-form.component';
import {OneForAllDealFormComponent} from './one-for-all-deal-form/one-for-all-deal-form.component';
import {TransferComponent} from './transfer/transfer.component';
import {DebtorsComponent} from './debtors/debtors.component';
import {TransfersComponent} from './transfers/transfers.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AccountRoutingModule} from './account-routing.module';
import { DetailedComponent } from './detailed/detailed.component';

@NgModule({
  declarations: [
    AccountComponent,
    DealsComponent,
    DealComponent,
    DebtorDealFormComponent,
    OneForAllDealFormComponent,
    TransferComponent,
    DebtorsComponent,
    TransfersComponent,
    DashboardComponent,
    DetailedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
