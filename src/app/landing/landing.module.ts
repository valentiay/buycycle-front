import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {LandingRoutingModule} from './landing-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NepovesloComponent } from './nepoveslo/nepoveslo.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {AccountModule} from '../account/account.module';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, NepovesloComponent, NewAccountComponent, AccountsComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    HttpClientModule,
    AccountModule,
  ]
})
export class LandingModule { }
