import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../../environments/environment';

@Injectable()
export class HomeAdminService {

  message: Subject<any> = new Subject();
  private uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /*-------------------- Residencial Service -----------------------*/

  getAllResidencial(page: string = '1'): Observable<any> | any {


    return this.http.get(`${this.uri}/admin/imoveis/residencial`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', page)
      });
  }

  createResidencial(imovel, fotoPrincipal = undefined, fotosSecundarias = []) {

    let fotos = {
        fotoPrincipal: fotoPrincipal,
        fotosSecundarias: fotosSecundarias
      },
      createdId;

    this.http
      .post(`${this.uri}/admin/imoveis/residencial`,
        JSON.stringify(imovel),
        {observe: 'response'}
      )
      .subscribe(res => {

        if (res.status == 201) {
          createdId = res.body;

          return this.http.post(
            `${this.uri}/admin/imoveis/residencial/images/${createdId}`,
            fotos,
            {
              observe: 'response',
              headers: new HttpHeaders().set('content-type', 'application/octet-stream')
            })
            .subscribe(res => {

              this.message.next({severity: 'success', summary: 'Imóvel Residencial:', detail: 'Imóvel cadastrado com sucesso.'});
            }, err => {

              console.log(err);
              this.message.next({severity: 'error', summary: 'Imóvel Residencial:', detail: 'Não foi possível cadastrar o imóvel.'});
            });
        }

        this.message.next({severity: 'error', summary: 'Imóvel Residencial:', detail: 'Não foi possível cadastrar o imóvel.'});
      }, err => {

        console.log(err);
        this.message.next({severity: 'error', summary: 'Imóvel Residencial:', detail: 'Não foi possível cadastrar o imóvel.'});
      });
  }

  updateResidencial(imovel, id): Observable<any> | any {

    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/${id}`,
      JSON.stringify(imovel),
      {observe: 'response'});
  }

  deleteResidencial(id): Observable<any> | any {

    return this.http.delete(`${this.uri}/admin/imoveis/residencial/${id}`, {observe: 'response'});
  }

  addImagesResidencial(id, fotoPrincipal = undefined, fotosSecundarias = []): Observable<any> | any {

    let fotos = {
      fotoPrincipal: fotoPrincipal,
      fotosSecundarias: fotosSecundarias
    };

    return this.http
      .put(
        `${this.uri}/admin/imoveis/residencial/images/${id}`,
        fotos,
        {
          observe: 'response',
          headers: new HttpHeaders().set('content-type', 'application/octet-stream')
        });
  }

  updateImagesResidencial(id, fotos): Observable<any> | any {

    return this.http
      .put(
        `${this.uri}/admin/imoveis/residencial/images/add/${id}`,
        fotos,
        {
          observe: 'response',
          headers: new HttpHeaders().set('content-type', 'application/octet-stream')
        });
  }

  /*------------------- Comercial Service -----------------------*/

  getAllComercial(page: string = '1'): Observable<any> | any {

    return this.http.get(`${this.uri}/admin/imoveis/comercial`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', page)
      });
  }

  createComercial(imovel, fotoPrincipal = undefined, fotosSecundarias = []) {

    let fotos = {
        fotoPrincipal: fotoPrincipal,
        fotosSecundarias: fotosSecundarias
      },
      createdId;

    this.http
      .post(`${this.uri}/admin/imoveis/comercial`,
        JSON.stringify(imovel),
        {observe: 'response'}
      )
      .subscribe(res => {

        if (res.status == 201) {
          createdId = res.body;

          return this.http.post(
            `${this.uri}/admin/imoveis/comercial/images/${createdId}`,
            fotos,
            {
              observe: 'response',
              headers: new HttpHeaders().set('content-type', 'application/octet-stream')
            })
            .subscribe(res => {

              this.message.next({severity: 'success', summary: 'Imóvel Comercial', detail: 'Imóvel cadastrado com sucesso.'});
            }, err => {

              console.log(err);
              this.message.next({severity: 'error', summary: 'Imóvel Comercial', detail: 'Não foi possível cadastrar o imóvel.'});
            });
        }

        this.message.next({severity: 'error', summary: 'Imóvel Comercial', detail: 'Não foi possível cadastrar o imóvel.'});
      }, err => {

        console.log(err);
        this.message.next({severity: 'error', summary: 'Imóvel Comercial', detail: 'Não foi possível cadastrar o imóvel.'});
      });
  }

  updateComercial(imovel, id): Observable<HttpEvent<Response>> | any {

    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/${id}`,
      JSON.stringify(imovel),
      {observe: 'response'});
  }

  deleteComercial(id) {

    return this.http
      .delete(
        `${this.uri}/admin/imoveis/comercial/${id}`,
        {observe: 'response'});
  }

  addImagesComercial(id, fotoPrincipal = undefined, fotosSecundarias = []):Observable<any> | any {

    let fotos = {
      fotoPrincipal: fotoPrincipal,
      fotosSecundarias: fotosSecundarias
    };

    return this.http
      .put(
        `${this.uri}/admin/imoveis/comercial/images/${id}`,
        fotos,
        {
          observe: 'response',
          headers: new HttpHeaders().set('content-type', 'application/octet-stream')
        });
  }

  updateImagesComercial(id, fotos):Observable<any> | any {

    return this.http
      .put(
        `${this.uri}/admin/imoveis/comercial/images/add/${id}`,
        fotos,
        {
          observe: 'response',
          headers: new HttpHeaders().set('content-type', 'application/octet-stream')
        });
  }
}
