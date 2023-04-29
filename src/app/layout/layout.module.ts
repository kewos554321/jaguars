import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MenuComponent } from './side-menu/menu.component';
import { MenuitemComponent } from './side-menu/menuitem.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AppConfigModule } from './config/config.module';
import { SidebarComponent } from "./side-menu/sidebar.component";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';

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
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule
    ],
    exports: [LayoutComponent]
})
export class LayoutModule { }
