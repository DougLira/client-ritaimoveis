import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImovelService} from '../../shared/services/imovel.service';
import {Subscription} from 'rxjs/Subscription';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.component.html',
  styleUrls: ['./duvidas.component.css']
})
export class DuvidasComponent implements OnInit {

  formDuvidas: FormGroup;
  subscriptionDuvida: Subscription;
  alert = {
    success: false,
    danger: false
  }

  constructor(private formBuilder: FormBuilder,
              private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.formDuvidas = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      assunto: [null, Validators.required],
      mensagem: [null, Validators.required]
    });
  }

  onSubmit() {

    this.subscriptionDuvida = this.imovelService.sendEmail(this.formDuvidas.value)
      .subscribe(response => {

        this.resetForm();
        this.alert.success = true;
        setTimeout(() => this.alert.success = false, 3000);
      }, err => {
        console.log(err)
        this.alert.danger = true;
        setTimeout(() => this.alert.danger = false, 3000);
      });
  }

  resetForm() {
    let control: AbstractControl = null;
    this.formDuvidas.reset();
    this.formDuvidas.markAsUntouched();
    Object.keys(this.formDuvidas.controls).forEach((name) => {
      control = this.formDuvidas.controls[name];
      control.setErrors(null);
    });
  }

  verifyValidTouched(field) {
    return !this.formDuvidas.get(field).valid && this.formDuvidas.get(field).touched;
  }

  getErrorMessage(field) {
    return this.formDuvidas.get(field).errors.required ? 'Campo obrigatório' :
      this.formDuvidas.get(field).errors.email ? 'Email inválido' : '';
  }
}
