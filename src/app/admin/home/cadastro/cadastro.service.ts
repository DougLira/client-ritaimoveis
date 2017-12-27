import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class CadastroService {

  message: Subject<any> = new Subject();

  constructor(private http: HttpClient,
              private route: Router) {
  }

  cadastrarImovelResidencial(imovel, fotoPrincipal = null, fotosSecundarias = []) {

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

          return this.http.put(`http://localhost:3000/admin/imoveis/update/images/${createdId}`,
            fotos,
            {
              observe: 'response',
              headers: new HttpHeaders().set('content-type', 'application/octet-stream')
            })
            .subscribe(res => {

              this.route.navigate(['/admin']);
            });
        }
      });
  }
}
