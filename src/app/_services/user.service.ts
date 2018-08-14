import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '/api' + '' + '' + '/users'

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getById(id: string) {

  }

  create(user: User) {
    return this.http.post(this.url, user);
  }

  update(user: User) {

  }

  delete(user: User) {

  }
}
