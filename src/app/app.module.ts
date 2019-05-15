import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faUserEdit,
  faUser,
  faUserShield,
  faCheck,
  faTimes,
  faPlus,
  faPencilAlt,
  faInfoCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {AccountModule} from './account/account.module';
import {CommonModule} from '@angular/common';
import {LandingModule} from './landing/landing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AccountModule,
    LandingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCheck, faTimes, faPlus, faPencilAlt, faInfoCircle, faExclamationTriangle, faUserEdit, faUser, faUserShield);
  }
}
