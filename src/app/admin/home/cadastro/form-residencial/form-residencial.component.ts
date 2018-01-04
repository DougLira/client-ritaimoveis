import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatHorizontalStepper} from '@angular/material';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-form-residencial',
  templateUrl: './form-residencial.component.html',
  styleUrls: ['./form-residencial.component.css']
})
export class FormResidencialComponent implements OnInit {

  @ViewChild('step') step: MatHorizontalStepper;
  private formResidencial: FormGroup;
  private fotoPrincipal = {
    urlBase64: '',
    message: ''
  };
  private fotosSecundarias = {
    fotos: [],
    message: ''
  };

  constructor(private formBuilder: FormBuilder,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.formResidencial = this.formBuilder.group({
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
      locacao: [null, Validators.required],
      churrasqueira: [false],
      piscina: [false],
      condominio: [false]
    });
  }


  onSubmit() {

    if (this.formResidencial.valid) {

      this.homeService.createResidencial(
        this.formResidencial.value,
        this.fotoPrincipal.urlBase64,
        this.fotosSecundarias.fotos);
    }

    this.homeService.message.subscribe(msg => {
      if (msg.severity === 'success') {

        this.formResidencial.reset();
        this.step.selectedIndex = 0;
      }
    });
  }

  getErrorMessage() {
    return 'Campo obrigatório';
  }

  uploadPrincipal(event) {

    let file: File = event.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      this.fotoPrincipal.urlBase64 = fileReader.result;
      this.fotoPrincipal.message = 'Foto carregada com sucesso';
      setTimeout(() => this.fotoPrincipal.message = '', 3000);
    };
  }

  uploadSecundarias(event) {

    this.fotosSecundarias.fotos = [];
    let files: File[] = event.files;

    for (let file of files) {

      let fileReader: FileReader = new FileReader();
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
