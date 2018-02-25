import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Imovel } from '../../../../shared/models/imovel';
import { ImovelService } from '../../../../shared/services/imovel.service';

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
  fotoPrincipal: File[] = undefined;
  fotosSecundarias: File[];
  fotosSecundariasSelecionadas: File[];
  fotosFiltradas: File[];
  idImovel: string;
  mensagem: string;
  url: File;

  constructor(private modalService: NgbModal,
    private imovelService: ImovelService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.modalService.open(this.modal, { size: 'lg' });
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

    this.imovelService.uploadImages(this.fotoPrincipal)
      .subscribe(path => {

        this.updateSubscription = this.imovelService.updateImagesResidencial(
          this.idImovel,
          path,
          this.fotosFiltradas
        ).subscribe(res => {

          this.updateView.next('Fotos do imóvel atualizadas com sucesso');
        }, err => console.log(err));
      });
  }

  selected(selected) {

    this.fotosSecundariasSelecionadas = [];
    const fotosSelecionadas = selected.selectedOptions.selected;

    if (fotosSelecionadas) {

      fotosSelecionadas.forEach((option: any) => {

        this.fotosSecundariasSelecionadas.push(option.value);
      });
    }

    this.fotosFiltradas = this.fotosSecundarias.filter(foto =>
      !this.fotosSecundariasSelecionadas.some(fotoSelecionada =>
        foto === fotoSelecionada)
    );
  }

  uploadPrincipal(event) {

    this.fotoPrincipal = [];
    this.fotoPrincipal = event.files;
    this.mensagem = 'Foto carregada com sucesso.';
    setTimeout(() => this.mensagem = undefined, 3000);
  }

  clear() {

    this.fotoPrincipal = [];
  }

  hover(url) {

    this.url = url;
    this.modalService.open(this.modalHover);
  }
}
