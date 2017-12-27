import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: '', canActivate: [LoginGuard], component: LoginComponent},
      {path: '', loadChildren: 'app/admin/home/home.module#HomeModule',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
