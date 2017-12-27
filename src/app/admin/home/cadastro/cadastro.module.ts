import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterializeModule} from 'angular2-materialize';
import {AccordionModule, FileUploadModule, MessageModule, MessagesModule} from 'primeng/primeng';

import {CadastroComponent} from './cadastro.component';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {FormResidencialComponent} from './form-residencial/form-residencial.component';
import {FormComercialComponent} from './form-comercial/form-comercial.component';
import {CadastroService} from './cadastro.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    MaterialDesignComponentsModule,
    AccordionModule,
    FileUploadModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    CadastroComponent,
    FormResidencialComponent,
    FormComercialComponent
  ],
  providers: [
    CadastroService
  ]
})
export class CadastroModule {
}
