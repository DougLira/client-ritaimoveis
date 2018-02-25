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
import {DuvidasComponent} from './duvidas/duvidas.component';

const siteRoutes: Routes = [
  {path: '', component: SiteComponent, children: [
      {path: '', component: IndexComponent},
      {path: 'imoveis-residencial', component: CatalogoComponent, resolve: {response: ResidencialGuard}},
      {path: 'imoveis-lancamento', component: LancamentosComponent, resolve: {response: LancamentoGuard}},
      {path: 'imoveis-comercial', component: ComercialComponent, resolve: {response: ComercialGuard}},
      {path: 'sobre-mim', component: SobreMimComponent},
      {path: 'duvidas', component: DuvidasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
