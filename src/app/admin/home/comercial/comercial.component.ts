import {Component, OnDestroy, OnInit} from '@angular/core';
import {Imovel} from '../../../models/imovel';
import {Subscription} from 'rxjs/Subscription';
import {HomeAdminService} from '../home-admin.service';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent implements OnInit, OnDestroy {

  // @ViewChild('modal_dados') modal_dados;
  // @ViewChild('modal_fotos') modal_fotos;
  // @ViewChild('modal_add_fotos') modal_add_fotos;
  private subscriptionImoveis: Subscription;
  private subscriptionPages: Subscription;
  private subscriptionDelete: Subscription;
  private subscriptionUpdateDados: Subscription;
  private subscriptionUpdateFotos: Subscription;
  private subscriptionUpdateAddFotos: Subscription;
  private msg = [];
  imoveis: Imovel[];
  paginator = {
    length: ''
  };

  constructor(private homeService: HomeAdminService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onPageChanges(event) {

    let page: string = event.pageIndex + 1;
    this.subscriptionPages = this.homeService.getAllResidencial(page)
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }
}
