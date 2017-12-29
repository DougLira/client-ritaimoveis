import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CadastroService {

  message: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
  }

  cadastrarImovelResidencial(imovel, fotoPrincipal = undefined, fotosSecundarias = []) {

    let fotos = {
        fotoPrincipal: fotoPrincipal,
        fotosSecundarias: fotosSecundarias
      },
      createdId;

    this.http
      .post(`http://localhost:3000/admin/imoveis`,
        JSON.stringify(imovel),
        {observe: 'response'}
      )
      .subscribe(res => {

        if (res.status == 201) {
          createdId = res.body;

          return this.http.put(
            `http://localhost:3000/admin/imoveis/images/${createdId}`,
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

  updateImovelResidencial(imovel, id): Observable<any> | any {

    return this.http.put(
      `http://localhost:3000/admin/imoveis/${id}`,
      JSON.stringify(imovel),
      {observe: 'response'});
  }
}
