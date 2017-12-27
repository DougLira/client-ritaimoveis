import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import {MatPaginatorIntl} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignComponentsModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
  providers: [
    {provide: MatPaginatorIntl, useClass: PaginatorComponent}
  ]
})
export class PaginatorModule { }
