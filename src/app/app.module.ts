import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PersonComponent} from './person/person.component';
import {PersonsComponent} from './persons/persons.component';
import {DealsComponent} from './deals/deals.component';
import {DealComponent} from './deal/deal.component';
import {DebtorDealFormComponent} from './debtor-deal-form/debtor-deal-form.component';
import {OneForAllDealFormComponent} from './one-for-all-deal-form/one-for-all-deal-form.component';
import {TransferComponent} from './transfer/transfer.component';
import {DebtorsComponent} from './debtors/debtors.component';
import {TransfersComponent} from './transfers/transfers.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck, faTimes, faPlus, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonsComponent,
    DealsComponent,
    DealComponent,
    DebtorDealFormComponent,
    OneForAllDealFormComponent,
    TransferComponent,
    DebtorsComponent,
    TransfersComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCheck, faTimes, faPlus, faPencilAlt);
  }
}
