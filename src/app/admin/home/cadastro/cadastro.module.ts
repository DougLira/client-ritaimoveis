import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterializeModule} from 'angular2-materialize';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {AccordionModule, FileUploadModule} from 'primeng/primeng';
import { FormResidencialComponent } from './form-residencial/form-residencial.component';
import { FormComercialComponent } from './form-comercial/form-comercial.component';
import {CadastroService} from './cadastro.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    MaterialDesignComponentsModule,
    AccordionModule,
    FileUploadModule
  ],
  declarations: [
    CadastroComponent,
    FormResidencialComponent,
    FormComercialComponent
  ],
  providers:[
    CadastroService
  ]
})
export class CadastroModule { }
