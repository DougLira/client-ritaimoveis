import {Component, OnInit} from '@angular/core';
import {CadastroService} from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private serviceMessage: string;

  constructor(private cadastroService: CadastroService) {
  }

  ngOnInit() {

    this.cadastroService.message.next(msg => this.serviceMessage = msg);
  }
}
