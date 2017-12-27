import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthService} from '../../login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.get('ID')) {

      const authReq = req.clone({setHeaders: {'x-access-token': this.authService.getTokenHeader()}});
      return next
        .handle(authReq)
        .do(event => {

          if (event instanceof HttpResponse && event.status == 401) {

            this.authService.logout();
          }
        });
    }

    return next
      .handle(req)
      .do(event => {

        if (event instanceof HttpResponse && event.status == 401) {

          this.authService.logout();
        }
      });
  }
}
