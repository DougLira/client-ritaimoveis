import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Imovel } from '../../../../shared/models/imovel';
import { Subscription } from 'rxjs/Subscription';
import { ImovelService } from '../../../../shared/services/imovel.service';

@Component({
  selector: 'app-modal-add-fotos',
  templateUrl: './modal-add-fotos.component.html',
  styleUrls: ['./modal-add-fotos.component.css']
})
export class ModalAddFotosComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal;
  openModal = new Subject();
  updateView = new Subject();
  openSubscription: Subscription;
  idImovel: string;
  fotos = [];
  mensagem: string;

  constructor(private modalService: NgbModal,
    private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.openSubscription = this.openModal.subscribe((imovel: Imovel) => {

      this.modalService.open(this.modal);
      this.idImovel = imovel._id;
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
  }

  salvar() {

    this.imovelService.uploadImages([], this.fotos)
      .subscribe(path => {

        this.imovelService.addImagesResidencial(this.idImovel, path)
          .subscribe(res => {

            this.updateView.next('Fotos adicionadas com sucesso');
          }, err => console.log(err));
      });
  }

  upload(event) {

    this.fotos = [];
    this.fotos = event.files;
    this.mensagem = 'Fotos carregadas com sucesso.';
    setTimeout(() => this.mensagem = '', 3000);
  }

  clear() {

    this.fotos = [];
  }

  remove(event) {

    const file = event.file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      const index = this.fotos.indexOf(fileReader.result);
      this.fotos.splice(index, 1);
    };
  }
}
