import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterializeModule} from 'angular2-materialize';
import {MaterialDesignComponentsModule} from '../../material-design-components/material-design-components.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MaterialDesignComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterializeModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
