import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalDadosComponent} from './modal-dados.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalDadosComponent
  ],
  exports: [
    ModalDadosComponent
  ]
})
export class ModalDadosModule { }
