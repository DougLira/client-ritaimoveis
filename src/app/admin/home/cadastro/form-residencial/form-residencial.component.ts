import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatHorizontalStepper} from '@angular/material';
import {ImovelService} from '../../../../shared/services/imovel.service';

@Component({
  selector: 'app-form-residencial',
  templateUrl: './form-residencial.component.html',
  styleUrls: ['./form-residencial.component.css']
})
export class FormResidencialComponent implements OnInit {

  @ViewChild('step') step: MatHorizontalStepper;
  formResidencial: FormGroup;
  fotoPrincipal = {
    urlBase64: '',
    message: ''
  };
  fotosSecundarias = {
    fotos: [],
    message: ''
  };

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

      this.imovelService.createResidencial(
        this.formResidencial.value,
        this.fotoPrincipal.urlBase64,
        this.fotosSecundarias.fotos);
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

    const file: File = event.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      this.fotoPrincipal.urlBase64 = fileReader.result;
      this.fotoPrincipal.message = 'Foto carregada com sucesso';
      setTimeout(() => this.fotoPrincipal.message = '', 3000);
    };
  }

  uploadSecundarias(event) {

    this.fotosSecundarias.fotos = [];
    const files: File[] = event.files;

    for (const file of files) {

      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = e => {

        this.fotosSecundarias.fotos.push(fileReader.result);
      };
    }

    this.fotosSecundarias.message = 'Fotos carregadas com sucesso.';
    setTimeout(() => this.fotosSecundarias.message = '', 3000);
  }

  clearPrincipal() {

    this.fotoPrincipal.urlBase64 = undefined;
  }

  clearSecundarias() {

    this.fotosSecundarias.fotos = [];
  }

  removeSecundarias(event) {

    let file = event.file;
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      let index = this.fotosSecundarias.fotos.indexOf(fileReader.result);
      this.fotosSecundarias.fotos.splice(index, 1);
    };
  }
}
