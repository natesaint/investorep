import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  getStockInfo(timeSeries, ticker, interval): Observable<any> {
    return this.http.get<any>(`/api/stocks/${timeSeries}/${ticker}/${interval}`);
  }
}
