import {Component, Input, OnInit} from '@angular/core';
import {ImovelService} from '../../services/imovel.service';
import {Imovel} from '../../models/imovel';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  @Input() imovel:Imovel;

  constructor(private imovelService: ImovelService) {
  }

  ngOnInit() {

  }

  showModal() {

    this.imovelService.imovelModal.next(this.imovel);
    document.getElementById('simpleModal').style.display = 'block';
  }

}
