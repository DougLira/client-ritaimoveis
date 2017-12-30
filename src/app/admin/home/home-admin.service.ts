import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HomeAdminService {

  message: Subject<any> = new Subject();
  private uri: string = 'http://localhost:3000';

  // private uri: string = 'http://api-ritaimoveis-com.umbler.net';

  constructor(private http: HttpClient) {
  }

  /*-------------------- Residencial Service -----------------------*/

  getAllResidencial(page: string = '1'): Observable<any> | any {


    return this.http.get(`${this.uri}/admin/imoveis`,
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
      .post(`${this.uri}/admin/imoveis`,
        JSON.stringify(imovel),
        {observe: 'response'}
      )
      .subscribe(res => {

        if (res.status == 201) {
          createdId = res.body;

          return this.http.post(
            `${this.uri}/admin/imoveis/images/${createdId}`,
            fotos,
            {
              observe: 'response',
              headers: new HttpHeaders().set('content-type', 'application/octet-stream')
            })
            .subscribe(res => {

              this.message.next({severity: 'success', summary: 'Cadastro Efetuado', detail: 'Imóvel cadastrado com sucesso.'});
            }, err => {

              console.log(err);
              this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
            });
        }

        this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
      }, err => {

        console.log(err);
        this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
      });
  }

  updateResidencial(imovel, id): Observable<any> | any {

    return this.http.put(
      `${this.uri}/admin/imoveis/${id}`,
      JSON.stringify(imovel),
      {observe: 'response'});
  }

  deleteResidencial(id): Observable<any> | any {

    return this.http.delete(`${this.uri}/admin/imoveis/${id}`, {observe: 'response'});
  }

  addImagesResidencial(id, fotoPrincipal = undefined, fotosSecundarias = []): Observable<any> | any {

    let fotos = {
      fotoPrincipal: fotoPrincipal,
      fotosSecundarias: fotosSecundarias
    };

    return this.http
      .put(
        `${this.uri}/admin/imoveis/images/${id}`,
        fotos,
        {
          observe: 'response',
          headers: new HttpHeaders().set('content-type', 'application/octet-stream')
        });
  }

  updateImagesResidencial(id, fotos): Observable<any> | any {

    return this.http
      .put(
        `${this.uri}/admin/imoveis/images/add/${id}`,
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

              this.message.next({severity: 'success', summary: 'Cadastro Efetuado', detail: 'Imóvel cadastrado com sucesso.'});
            }, err => {

              console.log(err);
              this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
            });
        }

        this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
      }, err => {

        console.log(err);
        this.message.next({severity: 'error', summary: 'Cadastro Não Efetuado', detail: 'Não foi possível cadastrar o imóvel.'});
      });
  }

  updateComercial(imovel, id): Observable<any> | any {

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
