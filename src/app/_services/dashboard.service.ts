import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService
              ) { }

  getInfo(): Observable<any> {
    return this.http.get<any>('/api/dashboard/personal', { params: {token: this.authService.getToken()} });
  }
}
