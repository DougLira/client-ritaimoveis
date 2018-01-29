import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialDesignComponentsModule} from '../material-design-components/material-design-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HeaderComponent } from './header/header.component';
import {PainelModule} from './painel/painel.module';
import { IndexComponent } from './index/index.component';
import {ResidencialGuard} from './guards/residencial.guard';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import {LancamentoGuard} from './guards/lancamento.guard';
import {ModalDadosModule} from '../shared/components/modal-dados/modal-dados.module';
import {PaginatorModule} from '../shared/components/paginator/paginator.module';
import { ComercialComponent } from './comercial/comercial.component';
import {ComercialGuard} from './guards/comercial.guard';
import { SobreMimComponent } from './sobre-mim/sobre-mim.component';
import { DuvidasComponent } from './duvidas/duvidas.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    SiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignComponentsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    CommonModule,
    PainelModule,
    ModalDadosModule,
    PaginatorModule
  ],
  declarations: [
    SiteComponent,
    HeaderComponent,
    IndexComponent,
    CatalogoComponent,
    LancamentosComponent,
    ComercialComponent,
    SobreMimComponent,
    DuvidasComponent
  ],
  exports: [
    SiteComponent
  ],
  providers:[
    ResidencialGuard,
    LancamentoGuard,
    ComercialGuard
  ]
})
export class SiteModule { }
