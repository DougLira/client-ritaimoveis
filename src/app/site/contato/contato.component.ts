import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  formDuvidas: FormGroup;

  ngOnInit() {

    this.formDuvidas = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      assunto: [null, Validators.required]
    });

    console.log(this.formDuvidas);
  }

  verifyValidTouched(field) {
    return !this.formDuvidas.get(field).valid && this.formDuvidas.get(field).touched;
  }

  getErrorMessage(field) {
    return this.formDuvidas.get(field).errors.required? 'Campo obrigatório' :
    this.formDuvidas.get(field).errors.email? 'Email inválido' : '';
  }
}
