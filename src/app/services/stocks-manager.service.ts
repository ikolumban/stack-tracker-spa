import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Company } from '../models/company';
import { SentimentResponse } from '../models/sentiment-response';
import { Stock } from '../models/stock';
import { SymbolSearchResponse } from '../models/symbol-search-response';
import { DataLayerService } from './data-layer.service';
import { StorageHandlerService } from './storage-handler.service';

@Injectable({
  providedIn: 'root',
})
export class StocksManagerService {
  public trackedStocksUpdated = new Subject<Array<Stock>>();
  public warningMessageUpdated = new Subject<string>();
  private trackedStocks: Array<Stock> = [];
  private readonly stockAlreadyTrackedWarningMessage = 'Stock already tracked';
  private readonly stockNotFoundWarningMessage = 'Stock not found';
  private readonly emptyWarningMessage = '';

  constructor(
    private dataLayerService: DataLayerService,
    private storageHandlerService: StorageHandlerService
  ) {}

  public loadStocksFromStorage(): void {
    debugger;
    this.trackedStocks = [];
    const storedSymbols = this.storageHandlerService.getAllSymbolsFromStorage();
    if (storedSymbols.length === 0) {
      this.trackedStocksUpdated.next(this.trackedStocks);
    } else {
      storedSymbols.forEach((symbol) => {
        this.requestStock(symbol, false);
      });
    }
  }

  public trackStock(symbol: string): void {
    if (!this.stockIsTracked(symbol)) {
      this.requestStock(symbol, true);
    } else {
      this.warningMessageUpdated.next(this.stockAlreadyTrackedWarningMessage);
    }
  }

  public closeTrack(symbol: string): void {
    this.trackedStocks = this.trackedStocks.filter(
      (stock) => stock.symbol !== symbol
    );
    this.storageHandlerService.deleteSymbolFromStorage(symbol);
    this.trackedStocksUpdated.next(this.trackedStocks);
  }

  public getTrackedStockCompanyNameBySymbol(symbol: string): string {
    return (
      this.trackedStocks.find((stock) => stock.symbol === symbol)
        ?.companyName ?? ''
    );
  }

  public getSentimentInformationOfSymbol(
    symbol: string,
    fromDate: string,
    toDate: string
  ): Observable<SentimentResponse> {
    return this.dataLayerService.getSentimentInformationOfSymbol(
      symbol,
      fromDate,
      toDate
    );
  }

  private getCompanyName(
    symbol: string,
    possibleCompanies: Array<Company>
  ): string {
    const exactMatch = possibleCompanies.find(
      (company) => company.symbol === symbol
    );
    return exactMatch?.description ?? '';
  }

  private stockIsTracked(symbol: string): boolean {
    return this.trackedStocks.some((stock) => stock.symbol === symbol);
  }

  private requestStock(symbol: string, updateStorage: boolean): void {
    this.warningMessageUpdated.next(this.emptyWarningMessage);
    this.dataLayerService
      .getPossibleCompaniesOfSymbol(symbol)
      .subscribe((response: SymbolSearchResponse) => {
        const companyName = this.getCompanyName(symbol, response.result);
        if (companyName) {
          this.dataLayerService
            .getQuoteOfSymbol(symbol)
            .subscribe((stock: Stock) => {
              if (stock.c !== 0) {
                stock.symbol = symbol;
                stock.companyName = companyName;
                this.trackedStocks.push(stock);
                if (updateStorage) {
                  this.storageHandlerService.saveSymbolIntoStorage(symbol);
                }
                this.trackedStocksUpdated.next(this.trackedStocks);
                this.warningMessageUpdated.next(this.emptyWarningMessage);
              } else {
                this.warningMessageUpdated.next(
                  this.stockNotFoundWarningMessage
                );
              }
            });
        } else {
          this.warningMessageUpdated.next(this.stockNotFoundWarningMessage);
        }
      });
  }
}
