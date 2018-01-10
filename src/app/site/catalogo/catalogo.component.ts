import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ImovelService} from '../../services/imovel.service';
import {Imovel} from '../../models/imovel';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnDestroy {


  private subscriptionResolver: Subscription;
  private subscriptionSearch: Subscription;
  private subscriptionFilter: Subscription;
  private filterResidencial: FormGroup;
  private imoveis: Imovel[];
  private collectionSizeImoveis: number;

  constructor(private imovelService: ImovelService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.filterResidencial = this.formBuilder.group({
      tipo: ['casa'],
      finalidade: ['venda'],
      minimo: [''],
      maximo: [''],
    });

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

  search(search) {

    this.subscriptionSearch = this.imovelService.getAllResidencial(1, search)
      .subscribe(resp => {

        if (resp.status == 200) {

          this.collectionSizeImoveis = resp.body.collectionSize;
          this.imoveis = resp.body.content;
        }
      }, err => {
        console.log(err);
      });
  }

  onFilter() {

    this.subscriptionFilter = this.imovelService.filterResidencial(this.filterResidencial.value)
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
