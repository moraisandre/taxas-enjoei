import { Component } from '@angular/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  enjoeiPro = false;

  price = 0;
  profit = 0;
  tax = 0;
  percentProfit = 0;
  percentTax = 0;

  calculateTaxes(value: number) {
    let commission = 0;
    let flatRate = 0;

    console.log(this.enjoeiPro);

    if (this.enjoeiPro) {
      commission = 50;
      flatRate = this.getFlatRatePro(value);
    } else {
      commission = value <= 100 ? 18.5 : 20;
      flatRate = this.getFlatRate(value);
    }

    this.profit = value - (value * commission / 100) - flatRate;
    this.tax = (value * commission / 100) + flatRate;
    this.percentProfit = this.profit / value;
    this.percentTax = this.tax / value;
  }

  getFlatRate(value: number): number {
    if (value <= 50) {
      return 1.9;
    } else if (value > 50 && value <= 70) {
      return 3.5;
    } else if (value > 70 && value <= 100) {
      return 5;
    } else if (value > 100 && value <= 150) {
      return 6.5;
    } else if (value > 150 && value <= 200) {
      return 7.5;
    } else if (value > 200 && value <= 1500) {
      return 13;
    }

    return 0;
  }

  getFlatRatePro(value: number): number {
    if (value <= 100) {
      return 5;
    } else if (value > 100 && value <= 150) {
      return 6.5;
    } else if (value > 150 && value <= 200) {
      return 7.5;
    } else if (value > 200 && value <= 1500) {
      return 13;
    }

    return 0;
  }
}
