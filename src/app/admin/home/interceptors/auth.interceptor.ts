import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../login/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.get('ID')) {

      const authReq = req.clone({setHeaders: {'x-access-token': this.authService.getTokenHeader()}});
      return next
        .handle(authReq)
        .do((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {

          }
        }, (err: any) => {

          if (err instanceof HttpErrorResponse) {
            this.authService.logout();
          }
        });
    }

    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

        }
      }, (err: any) => {

        if (err instanceof HttpErrorResponse) {
          this.authService.logout();
        }
      });
  }
}
