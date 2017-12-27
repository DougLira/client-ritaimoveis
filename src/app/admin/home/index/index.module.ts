import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialDesignComponentsModule} from '../../../material-design-components/material-design-components.module';
import { IndexComponent } from './index.component';
import {PaginatorModule} from '../paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignComponentsModule,
    PaginatorModule
  ],
  declarations: [
    IndexComponent
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
