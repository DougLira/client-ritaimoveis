import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Imovel} from '../../../../shared/models/imovel';
import {ImovelService} from '../../../../shared/services/imovel.service';

@Component({
  selector: 'app-modal-fotos-imovel',
  templateUrl: './modal-fotos-imovel.component.html',
  styleUrls: ['./modal-fotos-imovel.component.css']
})
export class ModalFotosImovelComponent implements OnInit, OnDestroy {

  @ViewChild('modal_fotos') modal;
  @ViewChild('modal_hover') modalHover;
  open = new Subject();
  updateView = new Subject();
  openSubscription: Subscription;
  updateSubscription: Subscription;
  fotoPrincipal = undefined;
  fotosSecundarias = [];
  fotosSecundariasSelecionadas = [];
  fotosFiltradas = [];
  imovel: Imovel;
  mensagem: string;
  url: string;

  constructor(private modalService: NgbModal,
              private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.modalService.open(this.modal, {size: 'lg'});
      this.fotosSecundarias = imovel.fotos;
      this.fotosFiltradas = imovel.fotos;
      this.imovel = imovel;
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }

  salvar() {

    if (this.imovel.dormitorios === undefined) {

      this.updateSubscription = this.imovelService.addImagesComercial(
        this.imovel._id,
        this.fotoPrincipal,
        this.fotosFiltradas
      ).subscribe(res => {

        this.updateView.next('Fotos do imóvel atualizadas com sucesso');
      }, err => console.log(err));
    } else {

      this.updateSubscription = this.imovelService.addImagesResidencial(
        this.imovel._id,
        this.fotoPrincipal,
        this.fotosFiltradas
      ).subscribe(res => {

        this.updateView.next('Fotos do imóvel atualizadas com sucesso');
      }, err => console.log(err));
    }


  }

  selected(selected) {

    this.fotosSecundariasSelecionadas = [];
    const fotosSelecionadas = selected.selectedOptions.selected;

    if (fotosSelecionadas) {

      fotosSelecionadas.forEach(option => {

        this.fotosSecundariasSelecionadas.push({url: option.value});
      });
    }

    this.fotosFiltradas = this.fotosSecundarias.filter(foto =>
      !this.fotosSecundariasSelecionadas.some(fotoSelecionada =>
        foto.url === fotoSelecionada.url)
    );
  }

  uploadPrincipal(event) {

    const file: File = event.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = e => {

      this.fotoPrincipal = fileReader.result;
      this.mensagem = 'Foto carregada com sucesso.';
      setTimeout(() => this.mensagem = undefined, 3000);
    };
  }

  clear() {

    this.fotoPrincipal = undefined;
  }

  hover(url) {

    this.url = url;
    this.modalService.open(this.modalHover);
  }
}
