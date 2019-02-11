import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { DealsComponent } from './deals/deals.component';
import { DealComponent } from './deal/deal.component';
import { DealFormComponent } from './deal-form/deal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonsComponent,
    DealsComponent,
    DealComponent,
    DealFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
