import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taxas-enjoei';
  checked = false;
  color = 'grey';

  toogleEnjoeiPro(this: any) {
    if (this.checked === true) {
      this.checked = false;
      this.color = 'grey';
    } else {
      this.checked = true;
      this.color = 'primary';
    }
  }
}
