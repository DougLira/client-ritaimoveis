import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {Imovel} from '../../../shared/models/imovel';

@Component({
  selector: 'app-modal-dados',
  templateUrl: './modal-dados.component.html',
  styleUrls: ['./modal-dados.component.css']
})
export class ModalDadosComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modalDados;
  open = new Subject();
  openSubscription: Subscription;
  imovel: Imovel;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.imovel = imovel;
      this.modalService.open(this.modalDados, {size: 'lg'});
    });
  }

  ngOnDestroy() {
    if (this.openSubscription) this.openSubscription.unsubscribe();
  }

}
