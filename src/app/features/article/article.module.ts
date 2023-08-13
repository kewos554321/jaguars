import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ExampleComponent } from './pages/example/example.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    ExampleComponent,
    HelloWorldComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
  ]
})
export class ArticleModule { }
