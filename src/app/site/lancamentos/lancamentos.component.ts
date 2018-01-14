import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  formLancamentos: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.formLancamentos = this.formBuilder.group({
      residencial: [false],
      comercial: [false]
    });
  }

  onFilter(){

    console.log(this.formLancamentos.value);
  }

}
