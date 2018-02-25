import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImovelService } from '../../../../shared/services/imovel.service';

@Component({
  selector: 'app-form-comercial',
  templateUrl: './form-comercial.component.html',
  styleUrls: ['./form-comercial.component.css']
})
export class FormComercialComponent implements OnInit {

  @ViewChild('step') step: MatHorizontalStepper;
  formComercial: FormGroup;
  foto: File[];
  fotos: File[];
  messagePrincipal;
  messageSecundarias;

  constructor(private formBuilder: FormBuilder,
    private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.formComercial = this.formBuilder.group({
      lancamento: [false, Validators.required],
      anuncio: [null, Validators.required],
      valor: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      endereco: [null, Validators.required],
      descricao: [''],
      area_util: [null, Validators.required],
      tipo: [null, Validators.required],
      finalidade: [null, Validators.required]
    });
  }

  onSubmit() {

    if (this.formComercial.valid) {

      this.imovelService.uploadImages(this.foto, this.fotos)
        .subscribe(path => {
          const imovel = this.buildImovel(path);
          this.imovelService.createComercial(imovel);
        }, err => console.log(err));
    }

    this.imovelService.message.subscribe((msg: any) => {
      if (msg.severity === 'success') {

        this.resetForm(this.formComercial);
        this.step.selectedIndex = 0;
        this.clearPrincipal();
        this.clearSecundarias();
      }
    });
  }

  verifyValidTouched(field) {
    return !this.formComercial.get(field).valid && this.formComercial.get(field).touched;
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
    this.messagePrincipal = 'Foto carregada com sucesso';
    setTimeout(() => this.messagePrincipal = '', 3000);
  }

  uploadSecundarias(event) {

    this.fotos = [];
    this.fotos = event.files;
    this.messageSecundarias = 'Fotos carregadas com sucesso.';
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

  buildImovel(fotos = []): Object {

    const imovel = this.formComercial.value;
    let foto: string;

    if (fotos.length > 0) {
      foto = fotos.pop();
    }

    imovel.foto = foto;
    imovel.fotos = fotos;
    return imovel;
  }
}
