import { Component, OnInit } from '@angular/core';

import { StocksService } from '../_services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockTicker: string;
  currentPrice: string;

  validTicker: boolean;
  loading: boolean;

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.validTicker = true;
    this.loadStock('TIME_SERIES_INTRADAY', 'AAPL', '1min');
  }

  loadStock(timeSeries, ticker, interval) {
    this.stockTicker = '$' + ticker;
    this.stocksService.getStockInfo(timeSeries, ticker, interval)
        .subscribe(
          data => {
            if (data.error_message) {
              this.validTicker = false;
            } else {
              this.validTicker = true;
              this.currentPrice = data['Meta Data']['1. Information'];
            }
          },
          error => {
            this.validTicker = false;
          }
        );
  }
}
