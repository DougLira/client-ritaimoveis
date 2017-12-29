import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MessagesModule} from 'primeng/primeng';

import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import { IndexComponent } from './index.component';
import {PaginatorModule} from '../paginator/paginator.module';
import { ModalDadosImovelComponent } from './modal-dados-imovel/modal-dados-imovel.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignComponentsModule,
    PaginatorModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MessagesModule
  ],
  declarations: [
    IndexComponent,
    ModalDadosImovelComponent
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
