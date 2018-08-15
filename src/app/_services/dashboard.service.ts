import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient
              ) { }

  getInfo(): Observable<any> {
    return this.http.get('/api/dashboard/personal');
  }
}
