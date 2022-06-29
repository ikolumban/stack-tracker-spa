import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SentimentResponse } from '../models/sentiment-response';
import { Stock } from '../models/stock';
import { SymbolSearchResponse } from '../models/symbol-search-response';

@Injectable({
  providedIn: 'root',
})
export class DataLayerService {
  private apiKey = '&token=bu4f8kn48v6uehqi3cqg';
  private apiURL = 'https://finnhub.io/api/v1/';

  constructor(private httpClient: HttpClient) {}

  public getQuoteOfSymbol(symbol: string): Observable<Stock> {
    return this.httpClient.get<Stock>(
      `${this.apiURL}quote?symbol=${symbol}${this.apiKey}`
    );
  }

  public getPossibleCompaniesOfSymbol(
    symbol: string
  ): Observable<SymbolSearchResponse> {
    return this.httpClient.get<SymbolSearchResponse>(
      `${this.apiURL}search?q=${symbol}${this.apiKey}`
    );
  }

  public getSentimentInformationOfSymbol(
    symbol: string,
    fromDate: string,
    toDate: string
  ): Observable<SentimentResponse> {
    return this.httpClient.get<SentimentResponse>(
      `${this.apiURL}stock/insider-sentiment?symbol=${symbol}&from=${fromDate}&to=${toDate}${this.apiKey}`
    );
  }
}
