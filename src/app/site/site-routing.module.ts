import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {SiteComponent} from './site.component';
import {ImoveisGuard} from './guards/imoveis.guard';

const siteRoutes: Routes = [
  {path: '', component: SiteComponent, children: [
      {path: '', component: IndexComponent},
      {path: 'catalogo/page/:page', component: CatalogoComponent, resolve: {response: ImoveisGuard}}
    ]
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
