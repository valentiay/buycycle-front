import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/accounts'
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
