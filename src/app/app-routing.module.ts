import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  { path: '', component: StocksComponent },
  { path: 'sentiment/:symbol', component: SentimentComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
