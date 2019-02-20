import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck, faTimes, faPlus, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { AutoFocusDirective } from './auto-focus.directive';
import {AccountModule} from './account/account.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AccountModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCheck, faTimes, faPlus, faPencilAlt);
  }
}
