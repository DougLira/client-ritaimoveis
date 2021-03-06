import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode, LOCALE_ID} from '@angular/core';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
