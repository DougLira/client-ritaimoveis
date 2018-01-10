import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpResponse} from '@angular/common/http';
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

  filterResidencial(filter): Observable<any> {

    let tipo = filter.tipo ? filter.tipo : 'undefined',
      locacao = filter.locacao ? filter.locacao : 'undefined',
      minimo = filter.minimo ? filter.minimo : 1000,
      maximo = filter.maximo ? filter.maximo : 1000000;

    return this.http.get(`${this.uri}/imoveis/residencial/filter`, {
      observe: 'response',
      params: new HttpParams()
        .set('tipo', tipo.toString())
        .set('locacao', locacao.toString())
        .set('minimo', minimo.toString())
        .set('maximo', maximo.toString())
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
