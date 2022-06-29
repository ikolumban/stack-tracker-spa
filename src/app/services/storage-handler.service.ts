import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageHandlerService {
  public saveSymbolIntoStorage(symbol: string): void {
    const key = `search_${symbol}`;
    localStorage.setItem(key, symbol);
  }

  public getAllSymbolsFromStorage(): Array<string> {
    const searches: Array<string> = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('search_')) {
        let item = localStorage.getItem(key) ?? '';
        searches.push(item);
      }
    });
    return searches;
  }

  public deleteSymbolFromStorage(symbol: string): void {
    const key = `search_${symbol}`;
    localStorage.removeItem(key);
  }
}
