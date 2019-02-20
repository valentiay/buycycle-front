import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const accountRoutes: Routes = [
  {
    path: 'account/:accountId',
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ],
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
