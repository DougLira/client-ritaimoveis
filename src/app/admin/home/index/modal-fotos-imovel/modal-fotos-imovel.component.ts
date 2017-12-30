import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Imovel} from '../../../../models/imovel';
import {HomeAdminService} from '../../home-admin.service';

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
  private openSubscription: Subscription;
  private updateSubscription: Subscription;
  private fotoPrincipal = undefined;
  private fotosSecundarias = [];
  private fotosSecundariasSelecionadas = [];
  private fotosFiltradas = [];
  private idImovel: string;
  private mensagem: string;
  private url: string;

  constructor(private modalService: NgbModal,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.modalService.open(this.modal, {size: 'lg'});
      this.fotosSecundarias = imovel.fotos;
      this.fotosFiltradas = imovel.fotos;
      this.idImovel = imovel._id;
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }

  salvar() {

    this.updateSubscription = this.homeService.addImagesResidencial(
      this.idImovel,
      this.fotoPrincipal,
      this.fotosFiltradas
    ).subscribe(res => {

      this.updateView.next('Fotos do imóvel atualizadas com sucesso');
    }, err => console.log(err));
  }

  selected(selected) {

    this.fotosSecundariasSelecionadas = [];
    let fotosSelecionadas = selected.selectedOptions.selected;

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

    let file: File = event.files[0];
    let fileReader: FileReader = new FileReader();
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
