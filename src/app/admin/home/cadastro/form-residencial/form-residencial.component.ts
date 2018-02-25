import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';
import { ImovelService } from '../../../../shared/services/imovel.service';
import { Imovel } from '../../../../shared/models/imovel';

@Component({
  selector: 'app-form-residencial',
  templateUrl: './form-residencial.component.html',
  styleUrls: ['./form-residencial.component.css']
})
export class FormResidencialComponent implements OnInit {

  @ViewChild('step') step: MatHorizontalStepper;
  formResidencial: FormGroup;
  foto: File[];
  fotos: File[];
  messagePrincipal;
  messageSecundarias;

  constructor(private formBuilder: FormBuilder,
    private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.formResidencial = this.formBuilder.group({
      lancamento: [false, Validators.required],
      anuncio: [null, Validators.required],
      valor: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      endereco: [null, Validators.required],
      descricao: [''],
      dormitorios: [null, Validators.required],
      suites: [null, Validators.required],
      vagas: [null, Validators.required],
      banheiros: [null, Validators.required],
      sala_estar: [null, Validators.required],
      sala_jantar: [null, Validators.required],
      area_util: [null, Validators.required],
      area_construida: [null, Validators.required],
      tipo: [null, Validators.required],
      finalidade: [null, Validators.required],
      churrasqueira: [false],
      piscina: [false],
      condominio: [false]
    });
  }

  onSubmit() {

    if (this.formResidencial.valid) {

      this.imovelService.uploadImages(this.foto, this.fotos)
        .subscribe(path => {
          const imovel: Imovel = this.buildImovel(path);
          this.imovelService.createResidencial(imovel);
        }, err => console.log(err));
    }

    this.imovelService.message.subscribe((msg: any) => {
      if (msg.severity === 'success') {

        this.resetForm(this.formResidencial);
        this.step.selectedIndex = 0;
        this.clearPrincipal();
        this.clearSecundarias();
      }
    });
  }

  verifyValidTouched(field) {
    return !this.formResidencial.get(field).valid && this.formResidencial.get(field).touched;
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

  getErrorMessage() {
    return 'Campo obrigatório';
  }

  uploadPrincipal(event) {

    this.foto = [];
    this.foto = event.files;
    this.messagePrincipal = 'Foto carregada com sucesso.';
    setTimeout(() => this.messagePrincipal = '', 3000);
  }

  uploadSecundarias(event) {

    this.fotos = [];
    this.fotos = event.files;
    this.messageSecundarias = 'Foto carregada com sucesso.';
    setTimeout(() => this.messageSecundarias = '', 3000);
  }

  clearPrincipal() {

    this.foto = [];
  }

  clearSecundarias() {

    this.fotos = [];
  }

  removeSecundarias(event) {

    const file = event.file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      const index = this.fotos.indexOf(fileReader.result);
      this.fotos.splice(index, 1);
    };
  }

  buildImovel(fotos = []): Imovel {

    let foto: string;

    if (fotos.length > 0) {
      foto = fotos.pop();
    }

    return new Imovel(
      '',
      this.formResidencial.get('anuncio').value,
      this.formResidencial.get('valor').value,
      foto,
      fotos,
      this.formResidencial.get('dormitorios').value,
      this.formResidencial.get('banheiros').value,
      this.formResidencial.get('vagas').value,
      this.formResidencial.get('suites').value,
      this.formResidencial.get('sala_estar').value,
      this.formResidencial.get('sala_jantar').value,
      this.formResidencial.get('churrasqueira').value,
      this.formResidencial.get('piscina').value,
      this.formResidencial.get('area_construida').value,
      this.formResidencial.get('area_util').value,
      this.formResidencial.get('cidade').value,
      this.formResidencial.get('bairro').value,
      this.formResidencial.get('endereco').value,
      this.formResidencial.get('tipo').value,
      this.formResidencial.get('condominio').value,
      this.formResidencial.get('finalidade').value,
      this.formResidencial.get('descricao').value,
      this.formResidencial.get('lancamento').value
    );
  }
}
