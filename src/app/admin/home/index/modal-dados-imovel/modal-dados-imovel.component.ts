import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Imovel} from '../../../../models/imovel';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-modal-dados-imovel',
  templateUrl: './modal-dados-imovel.component.html',
  styleUrls: ['./modal-dados-imovel.component.css']
})
export class ModalDadosImovelComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modal;
  open = new Subject();
  updateView = new Subject();
  openSubscription: Subscription;
  updateSubscription: Subscription;
  formResidencial: FormGroup;
  idImovel: string;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.idImovel = imovel._id;
      this.modalService.open(this.modal, {size: 'lg'});
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
        condominio: [imovel.condominio || false]
      });
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }

  salvar() {

    this.updateSubscription = this.homeService
      .updateResidencial(
        this.formResidencial.value,
        this.idImovel)
      .subscribe(res => {

        this.updateView.next('Imóvel atualizado com sucesso');
      }, err => {

        console.log(err);
      });
  }

  getErrorMessage() {
    return 'Campo obrigatório';
  }

  verifyValidTouched(field) {
    return !this.formResidencial.get(field).valid && this.formResidencial.get(field).touched;
  }
}
