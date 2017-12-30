import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import {IndexModule} from './index/index.module';
import {HomeRoutingModule} from './home-routing.module';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeAdminService} from './home-admin.service';
import {MaterialDesignComponentsModule} from '../../material-design-components/material-design-components.module';
import {ImovelService} from '../../services/imovel.service';
import {CadastroModule} from './cadastro/cadastro.module';
import {MaterializeModule} from 'angular2-materialize';
import {ComercialModule} from './comercial/comercial.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    IndexModule,
    HttpClientModule,
    MaterialDesignComponentsModule,
    CadastroModule,
    MaterializeModule,
    ComercialModule
  ],
  declarations: [
    HomeComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HomeAdminService,
    ImovelService
  ]
})
export class HomeModule { }
