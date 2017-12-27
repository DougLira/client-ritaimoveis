import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.verify();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<any> | any {

    return this.verify();
  }

  private verify() {

    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/admin']);
    return false;
  }
}
