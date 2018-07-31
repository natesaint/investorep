import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(email:string, password:string): Observable<boolean> {
    console.log(email, password);
    return of(false);
  }
}
