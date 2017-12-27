import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {AuthService} from './login/auth.service';
import {LoginModule} from './login/login.module';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LoginModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard
  ]
})
export class AdminModule { }
