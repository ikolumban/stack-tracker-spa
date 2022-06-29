import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StocksManagerService } from '../../services/stocks-manager.service';

@Component({
  selector: 'app-track-stock',
  templateUrl: './track-stock.component.html',
})
export class TrackStockComponent {
  @ViewChild('trackForm') trackForm!: NgForm;
  public warningMessage = '';

  constructor(private stocksManagerService: StocksManagerService) {
    this.stocksManagerService.warningMessageUpdated.subscribe(
      (message: string) => {
        this.warningMessage = message;
      }
    );
  }

  public onSubmit(): void {
    this.stocksManagerService.trackStock(this.trackForm.value.symbol);
    this.trackForm.reset();
  }
}
