import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {IndexModule} from './index/index.module';
import {HomeRoutingModule} from './home-routing.module';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialDesignComponentsModule} from '../../material-design-components/material-design-components.module';
import {ImovelService} from '../../shared/services/imovel.service';
import {CadastroModule} from './cadastro/cadastro.module';
import {MaterializeModule} from 'angular2-materialize';
import {ComercialModule} from './comercial/comercial.module';
import {PaginatorModule} from '../../shared/components/paginator/paginator.module';
import {LancamentosModule} from './lancamentos/lancamentos.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    IndexModule,
    HttpClientModule,
    MaterialDesignComponentsModule,
    MaterializeModule,
    CadastroModule,
    ComercialModule,
    LancamentosModule,
    PaginatorModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ImovelService
  ]
})
export class HomeModule {
}
