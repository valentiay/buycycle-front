import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {LandingRoutingModule} from './landing-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class LandingModule { }
