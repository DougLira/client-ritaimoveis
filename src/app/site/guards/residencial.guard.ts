import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Imovel} from '../../shared/models/imovel';
import {ImovelService} from '../../shared/services/imovel.service';

@Injectable()
export class ResidencialGuard implements Resolve<Imovel> {

  constructor(private imovelService: ImovelService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {

    return this.imovelService.getAllResidencial(route.params['page']);
  }
}
