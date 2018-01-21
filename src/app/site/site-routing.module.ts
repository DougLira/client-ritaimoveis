import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {SiteComponent} from './site.component';
import {ResidencialGuard} from './guards/residencial.guard';
import {LancamentosComponent} from './lancamentos/lancamentos.component';
import {LancamentoGuard} from './guards/lancamento.guard';

const siteRoutes: Routes = [
  {path: '', component: SiteComponent, children: [
      {path: '', component: IndexComponent},
      {path: 'catalogo/page/:page', component: CatalogoComponent, resolve: {response: ResidencialGuard}},
      {path: 'lancamentos', component: LancamentosComponent, resolve: {response: LancamentoGuard}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
