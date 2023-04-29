import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'jaguars-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jaguars';

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
