import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {HomeAdminService} from '../home-admin.service';
import {Imovel} from '../../../shared/models/imovel';
import {Subscription} from 'rxjs/Subscription';
import {ImovelService} from '../../../shared/services/imovel.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modal_dados;
  @ViewChild('modal_fotos') modal_fotos;
  @ViewChild('modal_add_fotos') modal_add_fotos;
  subscriptionImoveis: Subscription;
  subscriptionPages: Subscription;
  subscriptionDelete: Subscription;
  subscriptionUpdateDados: Subscription;
  subscriptionUpdateFotos: Subscription;
  subscriptionUpdateAddFotos: Subscription;
  subscriptionSearch: Subscription;
  msg = [];
  search: string;
  imoveis: Imovel[];
  paginator = {
    length: ''
  };

  constructor(private homeService: HomeAdminService,
              private imovelService: ImovelService) {
  }


  ngOnInit() {

    this.obterImoveis();

    this.subscriptionUpdateDados = this.modal_dados.updateView.subscribe(msg => {

      this.msg.push({severity: 'success', summary: 'Imóvel Atualizado', detail: msg});
      setTimeout(() => this.msg = [], 3000);
      this.obterImoveis();
    });

    this.subscriptionUpdateFotos = this.modal_fotos.updateView.subscribe(msg => {

      this.msg.push({severity: 'success', summary: 'Imóvel Atualizado', detail: msg});
      setTimeout(() => this.msg = [], 3000);
      this.obterImoveis();
    });

    this.subscriptionUpdateAddFotos = this.modal_add_fotos.updateView.subscribe(msg => {

      this.msg.push({severity: 'success', summary: 'Imóvel Atualizado', detail: msg});
      setTimeout(() => this.msg = [], 3000);
      this.obterImoveis();
    });
  }

  ngOnDestroy() {

    this.subscriptionImoveis.unsubscribe();
    if (this.subscriptionPages) this.subscriptionPages.unsubscribe();
    if (this.subscriptionDelete) this.subscriptionDelete.unsubscribe();
    if (this.subscriptionUpdateDados) this.subscriptionUpdateDados.unsubscribe();
    if (this.subscriptionUpdateFotos) this.subscriptionUpdateFotos.unsubscribe();
    if (this.subscriptionUpdateAddFotos) this.subscriptionUpdateAddFotos.unsubscribe();
  }

  obterImoveis() {
    this.subscriptionImoveis = this.homeService.getAllResidencial()
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  onPageChanges(event) {

    const page: string = event.pageIndex + 1;
    this.subscriptionPages = this.homeService.getAllResidencial(page)
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  searchResidencial() {

    setTimeout(() => {

      this.subscriptionSearch = this.imovelService.getAllResidencial(1, this.search)
        .subscribe(resp => {

          if (resp.status == 200) {

            this.paginator.length = resp.body.collectionSize;
            this.imoveis = resp.body.content;
          }
        }, err => {
          console.log(err);
        });
    }, 500);
  }

  delete(imovel) {

    this.subscriptionDelete = this.homeService.deleteResidencial(imovel._id)
      .subscribe(res => {

        this.subscriptionImoveis = this.homeService.getAllResidencial()
          .subscribe(res => {

            if (res.status == 200) {

              this.imoveis = res.body.content;
              this.paginator.length = res.body.collectionSize;
            } else {

            }
          });
      });
  }

  openModalAddFotos(imovel) {

    this.modal_add_fotos.openModal.next(imovel);
  }

  openModalDados(imovel) {

    this.modal_dados.open.next(imovel);
  }

  openModalFotos(imovel) {

    this.modal_fotos.open.next(imovel);
  }

}
