import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {IndexComponent} from './index/index.component';
import {CadastroComponent} from './cadastro/cadastro.component';

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path:'home', component:IndexComponent},
      {path:'cadastro', component:CadastroComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
