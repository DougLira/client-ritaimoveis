import {Component, OnDestroy, OnInit } from '@angular/core';
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
  subscriptionResolverLancamentos: Subscription;
  subscriptionFilter: Subscription;
  subscriptionPages: Subscription;
  paginator = {
    length: 1
  };

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

        this.lancamentos = data.response.content;
        this.paginator.length = data.response.collectionSize;
      }, err => console.log(err));
  }

  ngOnDestroy() {

    if (this.subscriptionResolverLancamentos) this.subscriptionResolverLancamentos.unsubscribe();
    if (this.subscriptionFilter) this.subscriptionFilter.unsubscribe();
  }

  onPageChanges(event) {

    const page: string = event.pageIndex + 1;
    this.subscriptionPages = this.imovelService.getAllResidencial(page)
      .subscribe(res => {

        if (res.status == 200) {

          this.lancamentos = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  onFilter() {

    this.subscriptionFilter = this.imovelService.filterLancamentos(this.formLancamentos.value.tipo)
      .subscribe(data => {

        this.lancamentos = data.content;
        this.paginator.length = data.collectionSize;
      });
  }

  clearFilter() {

    this.ngOnInit();
  }

  openModal(lancamento) {

    this.imovelService.openModal.next(lancamento);
  }

}
