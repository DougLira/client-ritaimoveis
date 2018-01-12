import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from './auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: boolean = false;
  hide: boolean = true;
  formLogin: FormGroup;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {


    this.formLogin = this.formBuilder.group(
      {
        login: [null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
        password: [null,
          [
            Validators.required,
            Validators.minLength(5)
          ]
        ]
      }
    );
  }

  ngOnDestroy() {

    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit() {

    if (this.formLogin.valid) {

      this.subscription = this.authService.login(this.formLogin.value)
        .subscribe(res => {

          if (res.status == 204) this.authService.success(true, res);

        }, err => {

          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 3500);
        });
    }
  }

  verifyCampo(campo) {

    return !this.formLogin.get(campo).valid && this.formLogin.get(campo).touched;
  }

  applyCssFieldError(campo) {

    return {
      'invalido': this.verifyCampo(campo)
    };
  }

  applyCssInputError(campo) {

    return {
      'invalid': this.verifyCampo(campo)
    };
  }

  toggleHide() {

    this.hide = !this.hide;
  }

}
