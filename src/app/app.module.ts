import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackStockComponent } from './stocks/track-stock/track-stock.component';
import { StocksComponent } from './stocks/stocks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SentimentComponent } from './sentiment/sentiment.component';
import { SignPipe } from './pipes/sign.pipe';
import { MonthPipe } from './pipes/month.pipe';
import { SpinnerComponent } from './common/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackStockComponent,
    StocksComponent,
    SentimentComponent,
    SignPipe,
    MonthPipe,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
