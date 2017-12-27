import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt'

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ImovelService} from './services/imovel.service';
import {SiteModule} from './site/site.module';

registerLocaleData(localePt,'pt');

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule
  ],
  providers: [
    ImovelService,
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
