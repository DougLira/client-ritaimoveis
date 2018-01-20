import {Component, OnInit, ViewChild} from '@angular/core';
import {MatHorizontalStepper} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-form-comercial',
  templateUrl: './form-comercial.component.html',
  styleUrls: ['./form-comercial.component.css']
})
export class FormComercialComponent implements OnInit {

  @ViewChild('step') step: MatHorizontalStepper;
  formComercial: FormGroup;
  fotoPrincipal = {
    urlBase64: '',
    message: ''
  };
  fotosSecundarias = {
    fotos: [],
    message: ''
  };

  constructor(private formBuilder: FormBuilder,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.formComercial = this.formBuilder.group({
      lancamento: [{lancamento: false}, Validators.required],
      anuncio: [null, Validators.required, Validators.maxLength(15)],
      valor: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      endereco: [null, Validators.required],
      descricao: [''],
      area_util: [null, Validators.required],
      tipo: [null, Validators.required],
    });
  }

  onSubmit() {

    if (this.formComercial.valid) {

      this.homeService.createComercial(
        this.formComercial.value,
        this.fotoPrincipal.urlBase64,
        this.fotosSecundarias.fotos);
    }

    this.homeService.message.subscribe(msg => {
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

    const file = event.file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      const index = this.fotosSecundarias.fotos.indexOf(fileReader.result);
      this.fotosSecundarias.fotos.splice(index, 1);
    };
  }
}
