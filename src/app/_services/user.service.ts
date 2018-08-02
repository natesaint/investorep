import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {

  }

  getById(id: string) {

  }

  create(user: User) {

  }

  update(user: User) {

  }

  delete(user: User) {

  }
}
