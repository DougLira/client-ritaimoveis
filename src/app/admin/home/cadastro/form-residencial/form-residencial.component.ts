import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CadastroService} from '../cadastro.service';

@Component({
  selector: 'app-form-residencial',
  templateUrl: './form-residencial.component.html',
  styleUrls: ['./form-residencial.component.css']
})
export class FormResidencialComponent implements OnInit {

  private formResidencial: FormGroup;
  private fotoPrincipal = {
    urlBase64: '',
    message: ''
  };
  private fotosSecudarias = {
    fotos: [],
    message: ''
  };

  constructor(private formBuilder: FormBuilder,
              private cadastroService: CadastroService) {
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
      churrasqueira: [false],
      piscina: [false],
      condominio: [false]
    });
  }


  onSubmit() {

    if (this.formResidencial.valid) {

      this.cadastroService.cadastrarImovelResidencial(
        this.formResidencial.value,
        this.fotoPrincipal.urlBase64,
        this.fotosSecudarias.fotos);
    }
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

    this.fotosSecudarias.fotos = [];
    let files: File[] = event.files;

    for (let file of files) {

      let fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = e => {

        this.fotosSecudarias.fotos.push(fileReader.result);
      };
    }

    this.fotosSecudarias.message = 'Fotos carregadas com sucesso.';
    setTimeout(() => this.fotosSecudarias.message = '', 3000);
  }
}
