import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ExampleComponent } from './pages/example/example.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';


@NgModule({
  declarations: [
    ExampleComponent,
    HelloWorldComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
