import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {HomeAdminService} from '../home-admin.service';
import {Imovel} from '../../../models/imovel';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modal_dados;
  private subscriptionImoveis: Subscription;
  private subscriptionPages: Subscription;
  private subscriptionDelete: Subscription;
  private subscriptionUpdate: Subscription;
  private msg = [];
  imoveis: Imovel[];
  paginator = {
    length: ''
  };

  constructor(private homeService: HomeAdminService) {
  }


  ngOnInit() {

    this.subscriptionUpdate = this.modal_dados.updateView.subscribe(msg => {

      this.msg.push({severity: 'success', summary: 'Imóvel Atualizado', detail: msg});
      setTimeout(() => this.msg = [], 3000);
      this.obterImoveis();
    });
    this.obterImoveis();
  }

  ngOnDestroy() {

    this.subscriptionImoveis.unsubscribe();
    if (this.subscriptionPages) this.subscriptionPages.unsubscribe();
    if (this.subscriptionDelete) this.subscriptionDelete.unsubscribe();
    if (this.subscriptionUpdate) this.subscriptionUpdate.unsubscribe();
  }

  obterImoveis() {
    this.subscriptionImoveis = this.homeService.getImoveis()
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  onPageChanges(event) {

    let page: string = event.pageIndex + 1;
    this.subscriptionPages = this.homeService.getImoveis(page)
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  delete(imovel) {

    this.subscriptionDelete = this.homeService.deleteImovel(imovel._id)
      .subscribe(res => {

        this.subscriptionImoveis = this.homeService.getImoveis()
          .subscribe(res => {

            if (res.status == 200) {

              this.imoveis = res.body.content;
              this.paginator.length = res.body.collectionSize;
            } else {

            }
          });
      });
  }

  openModalDados(imovel) {

    this.modal_dados.open.next(imovel);
  }

}
