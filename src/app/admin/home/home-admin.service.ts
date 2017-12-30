import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HomeAdminService {

  constructor(private http: HttpClient) {
  }

  private uri: string = 'http://localhost:3000';

  // uri: string = 'http://api-ritaimoveis-com.umbler.net';

  getImoveis(page: string = '1'): Observable<any> | any {


    return this.http.get(`${this.uri}/admin/imoveis`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', page)
      });
  }

  deleteImovel(id): Observable<any> | any {

    return this.http.delete(`${this.uri}/admin/imoveis/${id}`, {observe: 'response'});
  }
}
