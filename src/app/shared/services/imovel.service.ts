import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Filter } from "../models/filter";
import { environment } from "../../../environments/environment";

@Injectable()
export class ImovelService {
  // imovelModal = new Subject();
  message = new Subject();
  openModal = new Subject();
  uri: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

  createResidencial(imovel, fotoPrincipal = undefined, fotosSecundarias = []) {
    let fotos = {
        fotoPrincipal: fotoPrincipal,
        fotosSecundarias: fotosSecundarias
      },
      createdId;

    this.http
      .post(`${this.uri}/admin/imoveis/residencial`, JSON.stringify(imovel), {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 201) {
            createdId = res.body;

            return this.http
              .post(
                `${this.uri}/admin/imoveis/residencial/images/${createdId}`,
                fotos,
                {
                  observe: "response",
                  headers: new HttpHeaders().set(
                    "content-type",
                    "application/octet-stream"
                  )
                }
              )
              .subscribe(
                res => {
                  this.message.next({
                    severity: "success",
                    summary: "Imóvel Residencial:",
                    detail: "Imóvel cadastrado com sucesso."
                  });
                },
                err => {
                  console.log(err);
                  this.message.next({
                    severity: "error",
                    summary: "Imóvel Residencial:",
                    detail: "Não foi possível cadastrar o imóvel."
                  });
                }
              );
          }

          this.message.next({
            severity: "error",
            summary: "Imóvel Residencial:",
            detail: "Não foi possível cadastrar o imóvel."
          });
        },
        err => {
          console.log(err);
          this.message.next({
            severity: "error",
            summary: "Imóvel Residencial:",
            detail: "Não foi possível cadastrar o imóvel."
          });
        }
      );
  }

  updateResidencial(imovel, id): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/${id}`,
      JSON.stringify(imovel),
      { observe: "response" }
    );
  }

  deleteResidencial(id): Observable<any> | any {
    return this.http.delete(`${this.uri}/admin/imoveis/residencial/${id}`, {
      observe: "response"
    });
  }

  addImagesResidencial(
    id,
    fotoPrincipal = undefined,
    fotosSecundarias = []
  ): Observable<any> | any {
    let fotos = {
      fotoPrincipal: fotoPrincipal,
      fotosSecundarias: fotosSecundarias
    };

    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/images/${id}`,
      fotos,
      {
        observe: "response",
        headers: new HttpHeaders().set(
          "content-type",
          "application/octet-stream"
        )
      }
    );
  }

  updateImagesResidencial(id, fotos): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/residencial/images/add/${id}`,
      fotos,
      {
        observe: "response",
        headers: new HttpHeaders().set(
          "content-type",
          "application/octet-stream"
        )
      }
    );
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

  createComercial(imovel, fotoPrincipal = undefined, fotosSecundarias = []) {
    let fotos = {
        fotoPrincipal: fotoPrincipal,
        fotosSecundarias: fotosSecundarias
      },
      createdId;

    this.http
      .post(`${this.uri}/admin/imoveis/comercial`, JSON.stringify(imovel), {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 201) {
            createdId = res.body;

            return this.http
              .post(
                `${this.uri}/admin/imoveis/comercial/images/${createdId}`,
                fotos,
                {
                  observe: "response",
                  headers: new HttpHeaders().set(
                    "content-type",
                    "application/octet-stream"
                  )
                }
              )
              .subscribe(
                res => {
                  this.message.next({
                    severity: "success",
                    summary: "Imóvel Comercial",
                    detail: "Imóvel cadastrado com sucesso."
                  });
                },
                err => {
                  console.log(err);
                  this.message.next({
                    severity: "error",
                    summary: "Imóvel Comercial",
                    detail: "Não foi possível cadastrar o imóvel."
                  });
                }
              );
          }

          this.message.next({
            severity: "error",
            summary: "Imóvel Comercial",
            detail: "Não foi possível cadastrar o imóvel."
          });
        },
        err => {
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
      `${this.uri}/admin/imoveis/comercial/${id}`,
      JSON.stringify(imovel),
      { observe: "response" }
    );
  }

  deleteComercial(id) {
    return this.http.delete(`${this.uri}/admin/imoveis/comercial/${id}`, {
      observe: "response"
    });
  }

  addImagesComercial(
    id,
    fotoPrincipal = undefined,
    fotosSecundarias = []
  ): Observable<any> | any {
    let fotos = {
      fotoPrincipal: fotoPrincipal,
      fotosSecundarias: fotosSecundarias
    };

    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/images/${id}`,
      fotos,
      {
        observe: "response",
        headers: new HttpHeaders().set(
          "content-type",
          "application/octet-stream"
        )
      }
    );
  }

  updateImagesComercial(id, fotos): Observable<any> | any {
    return this.http.put(
      `${this.uri}/admin/imoveis/comercial/images/add/${id}`,
      fotos,
      {
        observe: "response",
        headers: new HttpHeaders().set(
          "content-type",
          "application/octet-stream"
        )
      }
    );
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
