import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sentiment } from '../models/sentiment';
import { StocksManagerService } from '../services/stocks-manager.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
})
export class SentimentComponent implements OnInit {
  public symbol = '';
  public companyName = '';
  public sentiments!: Array<Sentiment>;
  public loading = false;
  public waringMessage = '';
  private fromDate = '';
  private toDate = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stocksManagerService: StocksManagerService
  ) {
    this.setDates();
  }

  ngOnInit(): void {
    this.loading = true;
    this.symbol = this.route.snapshot.params['symbol'];
    this.companyName =
      this.stocksManagerService.getTrackedStockCompanyNameBySymbol(this.symbol);
    this.stocksManagerService
      .getSentimentInformationOfSymbol(this.symbol, this.fromDate, this.toDate)
      .subscribe((response) => {
        this.sentiments = response.data;
        this.loading = false;
        if (response.data.length === 0) {
          this.waringMessage = 'No sentiment information was found';
        } else {
          this.waringMessage = '';
        }
      });
  }

  private setDates(): void {
    let date = new Date();
    date.setDate(1);
    date.setHours(-1);
    this.toDate = date.toISOString().split('T')[0];
    date.setMonth(date.getMonth() - 3);
    date.setDate(1);
    this.fromDate = date.toISOString().split('T')[0];
  }

  public onNavigateBack() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
