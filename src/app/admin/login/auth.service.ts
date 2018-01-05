import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  uri: string = 'http://localhost:3000';

  // uri: string = 'http://api-ritaimoveis-com.umbler.net';

  constructor(private http: HttpClient,
              private route: Router) {
  }

  login(user): Observable<any> | any {

    return this.http
      .post(
        `${this.uri}/authenticate`,
        JSON.stringify(user),
        {
          observe: 'response'
        });

  }

  logout() {

    sessionStorage.removeItem('ID');
    this.route.navigate(['admin']);
  }

  isLoggedIn(): boolean {

    if (this.getTokenHeader()) {

      return true;
    } else {

      return false;
    }
  }

  success(auth: boolean, res?) {

    if (auth) {
      let token = res.headers.get('x-access-token');
      sessionStorage.setItem('ID', token);
      this.route.navigate(['admin/home']);
    } else {

      sessionStorage.removeItem('ID');
    }
  }

  getTokenHeader() {
    return sessionStorage.getItem('ID');
  }

  datePicker(hours): Date {
    let date1, date2;

    date1 = new Date();
    date2 = new Date();

    date1.setHours(date2.getHours() + hours);

    return date1;
  }
}
