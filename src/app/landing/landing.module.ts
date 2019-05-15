import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {LandingRoutingModule} from './landing-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {NepovesloComponent} from '../utils/nepoveslo/nepoveslo.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {AccountModule} from '../account/account.module';
import {AccountsComponent} from './accounts/accounts.component';
import {UtilsModule} from '../utils/utils.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, NepovesloComponent, NewAccountComponent, AccountsComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    HttpClientModule,
    AccountModule,
    UtilsModule,
    FontAwesomeModule,
  ]
})
export class LandingModule {
}
