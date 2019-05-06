import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {NepovesloComponent} from './nepoveslo/nepoveslo.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {AccountsComponent} from './accounts/accounts.component';

const landingRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'newAccount',
    component: NewAccountComponent,
  },
  {
    path: 'nepoveslo',
    component: NepovesloComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      landingRoutes,
    )
  ],
  exports: [ RouterModule ]
})
export class LandingRoutingModule { }
