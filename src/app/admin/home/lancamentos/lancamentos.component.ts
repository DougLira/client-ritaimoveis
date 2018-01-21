import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HomeAdminService} from '../home-admin.service';
import {ImovelService} from '../../../shared/services/imovel.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modal_dados;
  @ViewChild('modal_fotos') modal_fotos;
  @ViewChild('modal_add_fotos') modal_add_fotos;
  msg = [];
  lancamentos = [];
  subscriptionLancamentos: Subscription;
  subscriptionDelete: Subscription;
  subscriptionUpdateDados: Subscription;
  subscriptionPages: Subscription;
  subscriptionUpdateFotos: Subscription;
  subscriptionUpdateAddFotos: Subscription;
  paginator = {
    length: 0
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
    if (this.subscriptionLancamentos) this.subscriptionLancamentos.unsubscribe();
    if (this.subscriptionDelete) this.subscriptionDelete.unsubscribe();
    if (this.subscriptionUpdateDados) this.subscriptionUpdateDados.unsubscribe();
    if (this.subscriptionPages) this.subscriptionPages.unsubscribe();
    if (this.subscriptionUpdateFotos) this.subscriptionUpdateFotos.unsubscribe();
    if (this.subscriptionUpdateAddFotos) this.subscriptionUpdateAddFotos.unsubscribe();
  }

  obterImoveis() {
    this.subscriptionLancamentos = this.imovelService.getAllLancamentos(1)
      .subscribe(data => {

        this.lancamentos = data.content;
        this.paginator.length = data.collectionSize;
      });
  }

  onPageChanges(event) {

    const page: string = event.pageIndex + 1;
    this.subscriptionPages = this.imovelService.getAllLancamentos(page)
      .subscribe(data => {

        this.lancamentos = data.content;
        this.paginator.length = data.collectionSize;
      });
  }

  delete(lancamento) {

    if (lancamento.dormitorios === undefined) {

      this.subscriptionDelete = this.homeService.deleteComercial(lancamento._id)
        .subscribe(res => {

          this.obterImoveis();
        });
    } else {

      this.subscriptionDelete = this.homeService.deleteResidencial(lancamento._id)
        .subscribe(res => {

          this.obterImoveis();
        });
    }
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
