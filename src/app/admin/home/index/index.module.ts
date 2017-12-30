import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule, FileUploadModule, MessagesModule} from 'primeng/primeng';

import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import { IndexComponent } from './index.component';
import {PaginatorModule} from '../paginator/paginator.module';
import { ModalDadosImovelComponent } from './modal-dados-imovel/modal-dados-imovel.component';
import { ModalFotosImovelComponent } from './modal-fotos-imovel/modal-fotos-imovel.component';
import { ModalAddFotosComponent } from './modal-add-fotos/modal-add-fotos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignComponentsModule,
    PaginatorModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    AccordionModule,
    FileUploadModule
  ],
  declarations: [
    IndexComponent,
    ModalDadosImovelComponent,
    ModalFotosImovelComponent,
    ModalAddFotosComponent
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
