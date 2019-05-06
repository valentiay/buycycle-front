import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from './error/error.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ErrorComponent],
  exports: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class UtilsModule { }
