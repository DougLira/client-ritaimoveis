import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../models/imovel';
import {ImovelService} from '../../services/imovel.service';

@Component({
  selector: 'app-modal-dados',
  templateUrl: './modal-dados.component.html',
  styleUrls: ['./modal-dados.component.css']
})
export class ModalDadosComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modalDados;
  openSubscription: Subscription;
  imovel: Imovel;

  constructor(private modalService: NgbModal,
              private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.openSubscription = this.imovelService.openModal.subscribe((imovel: Imovel) => {

      this.imovel = imovel;
      this.modalService.open(this.modalDados, {size: 'lg'});
    });
  }

  ngOnDestroy() {
    if (this.openSubscription) this.openSubscription.unsubscribe();
  }

}
