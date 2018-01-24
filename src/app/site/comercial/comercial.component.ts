import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../shared/models/imovel';
import {ImovelService} from '../../shared/services/imovel.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent implements OnInit, OnDestroy {

  subscriptionResolver: Subscription;
  subscriptionSearch: Subscription;
  subscriptionFilter: Subscription;
  subscriptionPages: Subscription;
  filterComercial: FormGroup;
  imoveis: Imovel[];
  collectionSizeImoveis: number;
  paginator = {
    length: 1
  };

  constructor(private imovelService: ImovelService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.filterComercial = this.formBuilder.group({
      tipo: ['Sala Comercial'],
      finalidade: ['Venda'],
      minimo: [''],
      maximo: [''],
    });

    this.subscriptionResolver = this.route.data.subscribe(resolverRoute => {

      if (resolverRoute.response.status === 200) {

        this.collectionSizeImoveis = resolverRoute.response.body.collectionSize;
        this.imoveis = resolverRoute.response.body.content;
      }
    }, err => console.log('Error at Comercial:component ngOnInit:method. ERROR: ', err));
  }

  ngOnDestroy() {

    this.subscriptionResolver.unsubscribe();
    if (this.subscriptionSearch) this.subscriptionSearch.unsubscribe();
    if (this.subscriptionFilter) this.subscriptionFilter.unsubscribe();
  }

  onPageChanges(event) {

    const page: string = event.pageIndex + 1;
    this.subscriptionPages = this.imovelService.getAllComercial(page)
      .subscribe(res => {

        if (res.status === 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  search(search?) {

    this.subscriptionSearch = this.imovelService.getAllComercial(1, search)
      .subscribe(resp => {

        if (resp.status === 200) {

          this.collectionSizeImoveis = resp.body.collectionSize;
          this.imoveis = resp.body.content;
        }
      }, err => {
        console.log(err);
      });
  }

  // onFilter() {
  //
  //   this.subscriptionFilter = this.imovelService.filterComercial(this.filterComercial.value)
  //     .subscribe(resp => {
  //
  //       if (resp.status == 200) {
  //
  //         this.collectionSizeImoveis = resp.body.collectionSize;
  //         this.imoveis = resp.body.content;
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  // }

}
