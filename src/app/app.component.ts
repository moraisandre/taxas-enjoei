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

  publishPeriods = [
      {id: 90, description: "até 90 dias", flatRate: 7.5},
      {id: 91, description: "91 a 180 dias", flatRate: 10},
      {id: 181, description: "181 a 360 dias", flatRate: 12.5},
      {id: 360, description: "mais de 360 dias", flatRate: 50}
    ];

  selectedPublishPeriod = this.publishPeriods[0];

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
      this.flatRate = this.selectedPublishPeriod.flatRate;
    } else {
      this.commission = 18;
      this.flatRate = this.getFlatRate(value);

      if (this.shippingInsurance && this.commission > 23.5) {
        this.insurance = ((this.commission - 23.5) * 0.015) + 1.49;
      } else {
        this.insurance = (23.5 * 0.015) + 1.49;
      }

    }

    this.profit = value - (value * this.commission) / 100 - this.flatRate - this.shipping - this.insurance;
    this.tax = (value * this.commission) / 100 + this.flatRate + this.shipping + this.insurance;
    
    if (this.enjoeiPro && this.profit < 3) {
      this.profit = 3;
      this.tax = this.price - 3;
    }

    this.percentProfit = this.profit / value;
    this.percentTax = this.tax / value;
    this.commissionPrice = this.getCommissionPrice();
  }

  getFlatRate(value: number): number {
    if (value <= 18) {
      return 3.5;
    } else if (value > 15.01 && value <= 30) {
      return 7.5;
    } else if (value > 30.01 && value <= 50) {
      return 8.5;
    } else if (value > 50.01 && value <= 70) {
      return 10.5;
    } else if (value > 70.01 && value <= 100) {
      return 12.5;
    } else if (value > 100.01 && value <= 150) {
      return 16.5;
    } else if (value > 150.01 && value <= 300) {
      return 27.5;
    } else if (value > 300.01 && value <= 500) {
      return 45;
    }

    return 50;
  }

  getCommissionPrice(): number {
    if (this.commission !== 0) {
      return this.price * (this.commission / 100);
    }

    return 0;
  }
}
