import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from './error/error.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { Error401Component } from './error401/error401.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [ErrorComponent, Error401Component, Error404Component],
  exports: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class UtilsModule { }
