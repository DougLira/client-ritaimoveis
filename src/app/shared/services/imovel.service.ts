import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {FilterResidencial} from '../models/filterResidencial';
import {environment} from '../../../environments/environment';

@Injectable()
export class ImovelService {

  // imovelModal = new Subject();
  openModal = new Subject();
  uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /*---------------- Residencial API Site ------------------------*/

  getAllResidencial(page, search = ''): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/residencial`, {
      observe: 'response',
      params: new HttpParams()
        .set('page', page)
        .set('search', search)
    });
  }

  filterResidencial(filter: FilterResidencial): Observable<any> {

    const tipo = filter.tipo,
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

  /*---------------- Comercial API Site ------------------------*/

  getAllComercial(page, search = ''): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/comercial`, {
      observe: 'response',
      params: new HttpParams()
        .set('page', page)
        .set('search', search)
    });
  }

  /*---------------- Lancamentos API Site ------------------------*/

  getAllLancamentos(page): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/lancamentos`, {
      params: new HttpParams()
        .set('page', page)
    });
  }

  filterLancamentos(filter): Observable<any> {

    return this.http.get(`${this.uri}/imoveis/lancamentos/filter`, {
      params: new HttpParams()
        .set('comercial', filter.comercial || false)
        .set('residencial', filter.residencial || false)
    });
  }
}
