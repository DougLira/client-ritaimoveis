import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Imovel} from '../../../../shared/models/imovel';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-modal-dados-imovel',
  templateUrl: './modal-dados-imovel.component.html',
  styleUrls: ['./modal-dados-imovel.component.css']
})
export class ModalDadosImovelComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados_residencial') modalResidencial;
  @ViewChild('modal_dados_comercial') modalComercial;
  open = new Subject();
  updateView = new Subject();
  openSubscription: Subscription;
  updateSubscription: Subscription;
  formResidencial: FormGroup;
  formComercial: FormGroup;
  imovel: Imovel;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      if (imovel.dormitorios === undefined) {

        this.imovel = imovel;
        this.modalService.open(this.modalComercial, {size: 'lg'});
        this.formComercial = this.formBuilder.group({
          anuncio: [imovel.anuncio || null, Validators.required],
          valor: [imovel.valor || null, Validators.required],
          cidade: [imovel.cidade || null, Validators.required],
          bairro: [imovel.bairro || null, Validators.required],
          endereco: [imovel.endereco || null, Validators.required],
          descricao: [imovel.descricao || ''],
          area_util: [imovel.area_util || null, Validators.required],
          tipo: [imovel.tipo || null, Validators.required],
          finalidade: [imovel.finalidade || null, Validators.required],
          lancamento: [true]
        });
      } else {

        this.imovel = imovel;
        this.modalService.open(this.modalResidencial, {size: 'lg'});
        this.formResidencial = this.formBuilder.group({
          anuncio: [imovel.anuncio || null, Validators.required],
          valor: [imovel.valor || null, Validators.required],
          cidade: [imovel.cidade || null, Validators.required],
          bairro: [imovel.bairro || null, Validators.required],
          endereco: [imovel.endereco || null, Validators.required],
          descricao: [imovel.descricao || ''],
          dormitorios: [imovel.dormitorios || null, Validators.required],
          suites: [imovel.suites || null, Validators.required],
          vagas: [imovel.vagas || null, Validators.required],
          banheiros: [imovel.banheiros || null, Validators.required],
          sala_estar: [imovel.sala_estar || null, Validators.required],
          sala_jantar: [imovel.sala_jantar || null, Validators.required],
          area_util: [imovel.area_util || null, Validators.required],
          area_construida: [imovel.area_construida || null, Validators.required],
          tipo: [imovel.tipo || null, Validators.required],
          finalidade: [imovel.finalidade || null, Validators.required],
          churrasqueira: [imovel.churrasqueira || false],
          piscina: [imovel.piscina || false],
          condominio: [imovel.condominio || false],
          lancamento: [true]
        });
      }
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }

  salvar() {

    if (this.imovel.dormitorios === undefined) {

      this.updateSubscription = this.homeService
        .updateComercial(
          this.formComercial.value,
          this.imovel._id)
        .subscribe(res => {

          this.updateView.next('Imóvel atualizado com sucesso');
        }, err => {

          console.log(err);
        });
    } else {

      this.updateSubscription = this.homeService
        .updateResidencial(
          this.formResidencial.value,
          this.imovel._id)
        .subscribe(res => {

          this.updateView.next('Imóvel atualizado com sucesso');
        }, err => {

          console.log(err);
        });
    }
  }

  getErrorMessage() {
    return 'Campo obrigatório';
  }

  verifyValidTouched(field) {

    if (this.imovel.dormitorios === undefined) {
      return !this.formComercial.get(field).valid && this.formComercial.get(field).touched;
    } else {
      return !this.formResidencial.get(field).valid && this.formResidencial.get(field).touched;
    }
  }
}
