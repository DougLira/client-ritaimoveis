import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Filter} from '../site/catalogo/filter';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ImovelService {

  imovelModal = new Subject();
  uri: string = 'http://localhost:3000';

  // uri: string = 'http://api-ritaimoveis-com.umbler.net';

  constructor(private http: HttpClient) {
  }

  getAllResidencial(page, search = ''): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/residencial`, {
      observe: 'response',
      params: new HttpParams()
        .set('page', page)
        .set('search', search)
    });
  }

  filterResidencial(filter: Filter): Observable<any> {

    let tipo = filter.tipo ? filter.tipo : 'Casa',
      dormitorios = filter.dormitorios ? filter.dormitorios : 1,
      banheiros = filter.banheiros ? filter.banheiros : 1,
      valorMinimo = filter.valorMinimo ? filter.valorMinimo : 1000,
      valorMaximo = filter.valorMaximo ? filter.valorMaximo : 1000000;

    return this.http.get(`${this.uri}/imoveis/residencial/filter`, {
      observe: 'response',
      params: new HttpParams()
        .set('tipo', tipo.toString())
        .set('dormitorios', dormitorios.toString())
        .set('banheiros', banheiros.toString())
        .set('minimo', valorMinimo.toString())
        .set('maximo', valorMaximo.toString())
    });
  }

  getAllComercial(page, search = ''): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/comercial`, {
      observe: 'response',
      params: new HttpParams()
        .set('page', page)
        .set('search', search)
    });
  }
}
