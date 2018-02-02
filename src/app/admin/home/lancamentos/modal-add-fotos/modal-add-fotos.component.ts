import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Imovel} from '../../../../shared/models/imovel';
import {Subscription} from 'rxjs/Subscription';
import {ImovelService} from '../../../../shared/services/imovel.service';

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
  imovel: Imovel;
  fotos = [];
  mensagem: string;

  constructor(private modalService: NgbModal,
              private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.openSubscription = this.openModal.subscribe((imovel: Imovel) => {

      this.modalService.open(this.modal);
      this.imovel = imovel;
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
  }

  salvar() {

    if (this.imovel.dormitorios === undefined) {

      this.imovelService.updateImagesComercial(this.imovel._id, this.fotos)
        .subscribe(res => {

          this.updateView.next('Fotos adicionadas com sucesso');
        }, err => console.log(err));
    } else {

      this.imovelService.updateImagesResidencial(this.imovel._id, this.fotos)
        .subscribe(res => {

          this.updateView.next('Fotos adicionadas com sucesso');
        }, err => console.log(err));
    }
  }

  upload(event) {

    this.fotos = [];
    const files: File[] = event.files;

    for (const file of files) {

      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = e => {

        this.fotos.push({url: fileReader.result});
      };
    }

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
