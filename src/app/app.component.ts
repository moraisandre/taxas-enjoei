import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  enjoeiPro = false;
  shippingInsurance = false;

  price: number;
  profit = 0;
  tax = 0;
  percentProfit = 0;
  percentTax = 0;
  commission = 0;
  commissionPrice = 0;
  flatRate = 0;
  shipping = 0;
  insurance = 0;

  constructor(private _snackBar: MatSnackBar) {}

  calculateTaxes(value: number) {
    if (!this.price) {
      this._snackBar.open('Por favor, preencher o preço do produto.', null, {
        duration: 2000,
      });
      return;
    }

    if (this.price < 9) {
      this._snackBar.open('O valor tem que ser igual ou maior que 9 reais.', null, {
        duration: 2000,
      });
      return;
    }

    if (this.enjoeiPro) {
      this.commission = 50;
      this.flatRate = this.getFlatRatePro(value);
    } else {
      this.commission = value <= 100 ? 18.5 : 20;
      this.flatRate = this.getFlatRate(value);
    }

    if (this.shippingInsurance && this.price > 19) {
      const insuranceTemp = (0.01 * this.price) - 0.195 + .49;
      this.insurance = Math.floor(insuranceTemp * 100) / 100;
    } else {
      this.insurance = 0;
    }

    if (this.price >= 30 && this.price < 150) {
      this.shipping = 5;
    } else if (this.price >= 150) {
      this.shipping = 10;
    } else {
      this.shipping = 0;
    }

    this.profit = value - (value * this.commission) / 100 - this.flatRate - this.shipping - this.insurance;
    this.tax = (value * this.commission) / 100 + this.flatRate + this.shipping + this.insurance;
    this.percentProfit = this.profit / value;
    this.percentTax = this.tax / value;
    this.commissionPrice = this.getCommissionPrice();
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

  getCommissionPrice(): number {
    if (this.commission !== 0) {
      return this.price * (this.commission / 100);
    }

    return 0;
  }
}
