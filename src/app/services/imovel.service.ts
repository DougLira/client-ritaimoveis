import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {FilterResidencial} from '../models/filterResidencial';
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

  filterResidencial(filter: FilterResidencial): Observable<any> {

    let tipo = filter.tipo,
      finalidade = filter.finalidade,
      minimo = filter.minimo ? filter.minimo : 1000,
      maximo = filter.maximo ? filter.maximo : 1000000;

    return this.http.get(`${this.uri}/imoveis/residencial/filter`, {
      observe: 'response',
      params: new HttpParams()
        .set('tipo', tipo.toString())
        .set('finalidade', finalidade.toString())
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
