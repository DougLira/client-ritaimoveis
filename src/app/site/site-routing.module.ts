import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {SiteComponent} from './site.component';
import {ResidencialGuard} from './guards/residencial.guard';
import {LancamentosComponent} from './lancamentos/lancamentos.component';
import {LancamentoGuard} from './guards/lancamento.guard';
import {ComercialComponent} from './comercial/comercial.component';
import {ComercialGuard} from './guards/comercial.guard';
import {SobreMimComponent} from './sobre-mim/sobre-mim.component';

const siteRoutes: Routes = [
  {path: '', component: SiteComponent, children: [
      {path: '', component: IndexComponent},
      {path: 'catalogo', component: CatalogoComponent, resolve: {response: ResidencialGuard}},
      {path: 'lancamentos', component: LancamentosComponent, resolve: {response: LancamentoGuard}},
      {path: 'comercial', component: ComercialComponent, resolve: {response: ComercialGuard}},
      {path: 'sobre-mim', component: SobreMimComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
