import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'jaguars-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) { }
}
