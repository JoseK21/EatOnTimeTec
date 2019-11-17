import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './main/login/login.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { DashboardAComponent } from './admin/dashboard-a/dashboard-a.component';
import { DashboardCComponent } from './client/dashboard-c/dashboard-c.component';
import { OrdersComponent } from './chef/orders/orders.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  /* Main */
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },

  /* Admin */
  { path: 'admin/dashboard', component: DashboardAComponent },

  /* Client */
  { path: 'client/dashboard', component: DashboardCComponent },

  /* Chef */
  { path: 'chef/dashboard', component: OrdersComponent },

  /* { path: 'hero/:id',      component: DashboardCComponent },
  {
    path: 'heroes',
    component: HeroListComponent
  }, */
  /* { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
