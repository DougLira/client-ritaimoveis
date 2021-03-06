import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatIconRegistry, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule, MatRadioModule,
  MatSelectModule, MatSidenavModule, MatStepperModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [],
  providers: [MatIconRegistry]
})
export class MaterialDesignComponentsModule {
}
