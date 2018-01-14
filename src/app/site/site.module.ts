import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialDesignComponentsModule} from '../material-design-components/material-design-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HeaderComponent } from './header/header.component';
import {PainelModule} from './painel/painel.module';
import { IndexComponent } from './index/index.component';
import { PaginationComponent } from './pagination/pagination.component';
import {ImoveisGuard} from './guards/imoveis.guard';
import { LancamentosComponent } from './lancamentos/lancamentos.component';


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
    PainelModule
  ],
  declarations: [
    SiteComponent,
    ModalComponent,
    ModalDirective,
    CatalogoComponent,
    HeaderComponent,
    IndexComponent,
    PaginationComponent,
    LancamentosComponent
  ],
  exports: [
    SiteComponent
  ],
  providers:[
    ImoveisGuard
  ]
})
export class SiteModule { }
