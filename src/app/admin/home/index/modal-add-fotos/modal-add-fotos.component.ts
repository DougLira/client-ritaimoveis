import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Imovel} from '../../../../models/imovel';
import {Subscription} from 'rxjs/Subscription';
import {CadastroService} from '../../cadastro/cadastro.service';

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
  private idImovel: string;
  private fotos = [];
  private mensagem: string;

  constructor(private modalService: NgbModal,
              private cadastroService: CadastroService) {
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

  salvar(){

    this.cadastroService.addImagesResidencial(this.idImovel, this.fotos)
      .subscribe(res => {

        this.updateView.next('Fotos adicionadas com sucesso');
      }, err => console.log(err))
  }

  upload(event) {

    this.fotos = [];
    let files: File[] = event.files;

    for (let file of files) {

      let fileReader: FileReader = new FileReader();
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

    let file = event.file;
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      let index = this.fotos.indexOf(fileReader.result);
      this.fotos.splice(index, 1);
    };
  }
}
