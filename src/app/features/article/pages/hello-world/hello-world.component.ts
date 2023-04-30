import { Component, Input } from '@angular/core';

@Component({
  selector: 'jaguars-hello-world',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent {

  @Input() name: String = 'World';

}
