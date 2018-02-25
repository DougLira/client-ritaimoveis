import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Filter } from "../models/filter";
import { environment } from "../../../environments/environment";
import { Imovel } from "../models/imovel";

@Injectable()
export class ImovelService {
  // imovelModal = new Subject();
  message = new Subject();
  openModal = new Subject();
  uri: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*---------------- Uploads API ------------------------*/

  uploadImages(foto = [], fotos = []): Observable<any> | any {
    const all = fotos.concat(foto);

    const formData: FormData = new FormData();
    for (const file of all) {
      formData.append(file.name, file, file.name);
    }

    return this.http.post(`${this.uri}/upload`, formData);
  }


  /*---------------- Residencial API ------------------------*/

  getAllResidencial(page: string = "1", search = ""): Observable<any> {
    return this.http.get(`${this.uri}/imoveis/residencial`, {
      observe: "response",
      params: new HttpParams().set("page", page).set("search", search)
    });
  }

  filterResidencial(filter: Filter): Observable<any> {
    const tipo = filter.tipo,
      finalidade = filter.finalidade,
      minimo = filter.minimo ? filter.minimo : 1000,
      maximo = filter.maximo ? filter.maximo : 1000000;

    return this.http.get(`${this.uri}/imoveis/residencial/filter`, {
      observe: "response",
      params: new HttpParams()
        .set("tipo", tipo.toString())
        .set("finalidade", finalidade.toString())
        .set("minimo", minimo.toString())
        .set("maximo", maximo.toString())
    });
  }

  createResidencial(imovel: Imovel) {

    this.http
      .post(`${this.uri}/admin/imoveis/residencial`, imovel)
      .subscribe(res => {
        this.message.next({
          severity: "success",
          summary: "Imóvel Residencial:",
          detail: "Cadastrado com sucesso."
        });
      },
        err => {
          console.log(err);
          this.message.next({
            severity: "error",
            summary: "Imóvel Residencial:",
            detail: "Não foi possível cadastrar."
          });
        });
  }

  updateResidencial(imovel, id): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/${id}`, imovel);
  }

  deleteResidencial(id): Observable<any> | any {
    return this.http.delete(`${this.uri}/admin/imoveis/residencial/${id}`);
  }

  updateImagesResidencial(id, foto = [], fotos = []): Observable<any> | any {
    const all = {
      foto: foto,
      fotos: fotos
    };

    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/images/${id}`, all);
  }

  addImagesResidencial(id, fotos): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/images/add/${id}`, fotos);
  }

  /*---------------- Comercial API ------------------------*/

  getAllComercial(page: string = "1", search = ""): Observable<any> {
    return this.http.get(`${this.uri}/imoveis/comercial`, {
      observe: "response",
      params: new HttpParams().set("page", page).set("search", search)
    });
  }

  filterComercial(filter: Filter): Observable<any> {
    const tipo = filter.tipo,
      finalidade = filter.finalidade,
      minimo = filter.minimo ? filter.minimo : 1000,
      maximo = filter.maximo ? filter.maximo : 1000000;

    return this.http.get(`${this.uri}/imoveis/comercial/filter`, {
      observe: "response",
      params: new HttpParams()
        .set("tipo", tipo.toString())
        .set("finalidade", finalidade.toString())
        .set("minimo", minimo.toString())
        .set("maximo", maximo.toString())
    });
  }

  createComercial(imovel) {

    this.http
      .post(`${this.uri}/admin/imoveis/comercial`, imovel)
      .subscribe(res => {
        this.message.next({
          severity: "success",
          summary: "Imóvel Comercial",
          detail: "Imóvel cadastrado com sucesso."
        });
      }, err => {
        console.log(err);
        this.message.next({
          severity: "error",
          summary: "Imóvel Comercial",
          detail: "Não foi possível cadastrar o imóvel."
        });
      }
      );

  }

  updateComercial(imovel, id): Observable<HttpEvent<Response>> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/${id}`, imovel);
  }

  deleteComercial(id) {
    return this.http.delete(`${this.uri}/admin/imoveis/comercial/${id}`);
  }

  updateImagesComercial(id, foto = [], fotos = []): Observable<any> | any {
    const all = {
      foto: foto,
      fotos: fotos
    };

    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/images/${id}`, all);
  }

  addImagesComercial(id, fotos): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/images/add/${id}`, fotos);
  }

  /*---------------- Lancamentos API ------------------------*/

  getAllLancamentos(page): Observable<any> {
    return this.http.get(`${this.uri}/imoveis/lancamentos`, {
      params: new HttpParams().set("page", page)
    });
  }

  filterLancamentos(filter): Observable<any> {
    return this.http.get(`${this.uri}/imoveis/lancamentos/filter`, {
      params: new HttpParams()
        .set("comercial", filter.comercial || false)
        .set("residencial", filter.residencial || false)
    });
  }

  /*----------------- Dúvidas API -------------------------*/

  sendEmail(email): Observable<any> {
    return this.http.post(`${this.uri}/duvida`, email);
  }
}
