import { NgModule } from '@angular/core';
import { MenuComponent } from './side-menu/menu.component';
import { MenuitemComponent } from './side-menu/menuitem.component';
import { FooterComponent } from './footer/footer.component';
import { AppConfigModule } from './config/config.module';
import { SidebarComponent } from "./side-menu/sidebar.component";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
    declarations: [
        MenuitemComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SidebarComponent,
        LayoutComponent,
    ],
    imports: [
        SharedModule,
        AppConfigModule
    ],
    exports: [LayoutComponent]
})
export class LayoutModule { }
