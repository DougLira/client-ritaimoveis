import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../login/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authService.isLoggedIn()) {

      this.router.navigate(['/admin/home']);
      return false;
    }
    return true;
  }
}
