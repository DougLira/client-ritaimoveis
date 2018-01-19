import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
// import * as watermark from 'watermarkjs/dist/watermark.min.js';

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
      tipo: [false]
    });
  }

  onFilter() {

    console.log(this.formLancamentos.value);
  }

}
