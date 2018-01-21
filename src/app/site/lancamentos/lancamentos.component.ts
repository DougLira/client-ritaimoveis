import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImovelService} from '../../shared/services/imovel.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit, OnDestroy {

  formLancamentos: FormGroup;
  lancamentos = [];
  lancamentosCount: number;
  subscriptionResolverLancamentos: Subscription;
  subscriptionFilter: Subscription;

  constructor(private formBuilder: FormBuilder,
              private imovelService: ImovelService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.formLancamentos = this.formBuilder.group({
      tipo: [null]
    });
    this.subscriptionResolverLancamentos = this.route.data
      .subscribe(data => {

        console.log(data);
        this.lancamentos = data.response.content;
        this.lancamentosCount = data.response.collectionSize;
      }, err => console.log(err));
  }

  ngOnDestroy() {

    if (this.subscriptionResolverLancamentos) this.subscriptionResolverLancamentos.unsubscribe();
    if (this.subscriptionFilter) this.subscriptionFilter.unsubscribe();
  }

  onFilter() {

    this.subscriptionFilter = this.imovelService.filterLancamentos(this.formLancamentos.value.tipo)
      .subscribe(data => {

        this.lancamentos = data.content;
        this.lancamentosCount = data.collectionSize;
      });
  }

  openModalResidencial() {
  }

  openModalComercial() {
  }
}
