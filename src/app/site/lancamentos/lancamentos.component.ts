import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImovelService} from '../../shared/services/imovel.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  formLancamentos: FormGroup;
  lancamentos = [];
  lancamentosCount: number;
  subscriptionResolverLancamentos: Subscription;

  constructor(private formBuilder: FormBuilder,
              private imovelService: ImovelService) {
  }

  ngOnInit() {

    // console.log(Object.keys(this.person).length); maior que 12

    this.formLancamentos = this.formBuilder.group({
      tipo: [null]
    });
    this.imovelService.getAllLancamentos(1)
      .subscribe(data => {

        console.log(data);
        this.lancamentos = data.content;
        this.lancamentosCount = data.collectionSize;
      });
  }

  onFilter() {

    console.log(this.formLancamentos.value);
  }

  openModalResidencial() {
  }

  openModalComercial() {
  }
}
