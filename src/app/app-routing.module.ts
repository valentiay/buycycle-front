import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NepovesloComponent} from './utils/nepoveslo/nepoveslo.component';
import {Error401Component} from './utils/error401/error401.component';
import {Error404Component} from './utils/error404/error404.component';

const appRoutes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/accounts'
  },
  {
    path: 'nepoveslo',
    component: NepovesloComponent,
  },
  {
    path: '401',
    component: Error401Component,
  },
  {
    path: '404',
    component: Error404Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
