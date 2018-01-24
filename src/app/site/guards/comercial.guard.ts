import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Imovel} from '../../shared/models/imovel';
import {ImovelService} from '../../shared/services/imovel.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ComercialGuard implements Resolve<Imovel> {

  constructor(private imovelService: ImovelService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {

    return this.imovelService.getAllComercial(1);
  }
}
