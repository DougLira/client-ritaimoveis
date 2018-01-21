import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosComponent } from './lancamentos.component';
import {AccordionModule, FileUploadModule, MessagesModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../../shared/components/paginator/paginator.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {ModalAddFotosComponent} from './modal-add-fotos/modal-add-fotos.component';
import {ModalDadosImovelComponent} from './modal-dados-imovel/modal-dados-imovel.component';
import {ModalFotosImovelComponent} from './modal-fotos-imovel/modal-fotos-imovel.component';

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
    LancamentosComponent,
    ModalAddFotosComponent,
    ModalDadosImovelComponent,
    ModalFotosImovelComponent
  ]
})
export class LancamentosModule { }
