import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = '/api' + '' + '' + '/auth'

  constructor(private http: HttpClient) { }

  login(email:string, password:string) {
    return this.http.post<any>('/api/auth', {email: email, password: password})
                    .pipe(
                      map(res => {
                        if (res && res.token) {
                          console.log('Checking res');
                          console.log(res);
                          this.setSession(res);
                        }
                        return res;
                      })
                    );
  }

  private setSession(res) {
    const expiresAt = moment().add(res.expiresIn,'second');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
