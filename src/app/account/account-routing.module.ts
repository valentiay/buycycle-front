import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PersonsComponent} from './persons/persons.component';
import {DetailedComponent} from './detailed/detailed.component';
import {DealsComponent} from "./deals/deals.component";
import {TransferComponent} from "./transfer/transfer.component";
import {TransfersComponent} from "./transfers/transfers.component";
import {DebtorsComponent} from "./debtors/debtors.component";

const accountRoutes: Routes = [
  {
    path: 'account/:accountId',
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        component: DetailedComponent,
        children: [
          {
            path: 'persons',
            component: PersonsComponent
          },
          {
            path: 'deals',
            component: DealsComponent
          },
          {
            path: 'transfers',
            component: TransfersComponent
          },
          {
            path: 'debts',
            component: DebtorsComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(
      accountRoutes,
    )
  ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }
