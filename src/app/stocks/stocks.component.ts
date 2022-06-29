import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../models/stock';
import { StocksManagerService } from '../services/stocks-manager.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
})
export class StocksComponent implements OnInit {
  public trackedStocks: Array<Stock> = [];
  public warningMessage = '';
  public loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stocksManagerService: StocksManagerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stocksManagerService.trackedStocksUpdated.subscribe(
      (stocks: Array<Stock>) => {
        this.trackedStocks = stocks;
        this.loading = false;
      }
    );
    this.stocksManagerService.loadStocksFromStorage();
  }

  public closeTrack(symbol: string): void {
    this.stocksManagerService.closeTrack(symbol);
  }

  public goToSocialSentimentDetails(symbol: string): void {
    this.router.navigate(['/sentiment', symbol], { relativeTo: this.route });
  }

  public getChangedValue(stock: Stock) {
    return (stock.c * 100) / stock.o - 100;
  }
}
