import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComercialComponent } from './comercial.component';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule, FileUploadModule, MessagesModule} from 'primeng/primeng';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from '../paginator/paginator.module';

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
  declarations: [ComercialComponent]
})
export class ComercialModule { }
