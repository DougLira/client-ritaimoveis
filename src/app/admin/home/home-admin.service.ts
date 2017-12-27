import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HomeAdminService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://localhost:3000/admin';

  getImoveis(page: string = '1'): Observable<any> | any {


    return this.http.get(`${this.url}/imoveis`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', page)
      });
  }

  deleteImovel(id): Observable<any> | any {

    return this.http.delete(`${this.url}/imoveis/${id}`, {observe: 'response'});
  }
}
