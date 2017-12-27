import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ImovelService} from '../../services/imovel.service';
import {Filter} from './filter';
import {Imovel} from '../../models/imovel';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnDestroy {

  tiposImoveis = [
    {nome: 'Casa'},
    {nome: 'Apartamento'},
    {nome: 'Terreno'}
  ];

  private subscriptionResolver: Subscription;
  private subscriptionSearch: Subscription;
  private subscriptionFilter: Subscription;
  private filter: Filter = new Filter();
  private imoveis: Imovel[];
  private collectionSizeImoveis: number;

  constructor(private imovelService: ImovelService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.subscriptionResolver = this.route.data.subscribe(resolverRoute => {

      if (resolverRoute.response.status == 200) {

        this.collectionSizeImoveis = resolverRoute.response.body.collectionSize;
        this.imoveis = resolverRoute.response.body.content;
      }
    }, err => console.log('Error at Catalogo:component ngOnInit:method. ERROR: ' + JSON.stringify(err)));
  }

  ngOnDestroy() {

    this.subscriptionResolver.unsubscribe();
    if (this.subscriptionSearch) this.subscriptionSearch.unsubscribe();
    if (this.subscriptionFilter) this.subscriptionFilter.unsubscribe();
  }

  private searchAnuncio(search) {

    this.subscriptionSearch = this.imovelService.getAll(1, search)
      .subscribe(resp => {

        if (resp.status == 200) {

          this.collectionSizeImoveis = resp.body.collectionSize;
          this.imoveis = resp.body.content;
        }
      }, err => {
        console.log(err);
      });
  }

  private onFilter() {

    this.subscriptionFilter = this.imovelService.filter(this.filter)
      .subscribe(resp => {

        if (resp.status == 200) {

          this.collectionSizeImoveis = resp.body.collectionSize;
          this.imoveis = resp.body.content;
        }
      }, err => {
        console.log(err);
      });
  }
}
