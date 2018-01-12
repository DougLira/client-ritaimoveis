import {Foto} from './foto';

export class Imovel {

  constructor(public _id: string = '',
              public anuncio: string = '',
              public valor: number = 0,
              public fotoPrincipal = {url: ''},
              public fotos: Foto[] = [],
              public dormitorios: number = 1,
              public banheiros: number = 1,
              public vagas: number = 0,
              public suites: number = 0,
              public sala_estar: number = 1,
              public sala_jantar: number = 0,
              public churrasqueira: boolean = false,
              public piscina: boolean = false,
              public area_construida: number = 0,
              public area_util: number = 0,
              public cidade: string = '',
              public bairro: string = '',
              public endereco: string = '',
              public tipo: string = '',
              public condominio: boolean = false,
              public finalidade: string = '',
              public descricao: string = '') {
  }
}
