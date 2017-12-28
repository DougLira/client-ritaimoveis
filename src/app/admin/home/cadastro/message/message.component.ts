import {Component, OnInit} from '@angular/core';
import {CadastroService} from '../cadastro.service';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private msg: Message[] = [];

  constructor(private cadastroService: CadastroService) {
  }

  ngOnInit() {

    this.cadastroService.message.subscribe(msg => {
      this.msg = [];
      this.msg.push(msg);
      setTimeout(() => this.msg = [], 3000);
    });
  }

}
