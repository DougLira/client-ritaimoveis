import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComercialComponent } from './comercial.component';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule, FileUploadModule, MessagesModule} from 'primeng/primeng';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../../../shared/components/paginator/paginator.module';
import {ModalFotosImovelComponent} from './modal-fotos-imovel/modal-fotos-imovel.component';
import {ModalAddFotosComponent} from './modal-add-fotos/modal-add-fotos.component';
import {ModalDadosImovelComponent} from './modal-dados-imovel/modal-dados-imovel.component';

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
    ComercialComponent,
    ModalFotosImovelComponent,
    ModalAddFotosComponent,
    ModalDadosImovelComponent
  ]
})
export class ComercialModule { }
