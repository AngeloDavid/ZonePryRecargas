import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule, NbMenuModule } from '@nebular/theme';
import { MenuComponent } from './component/menu/menu.component';
import { EscritorioComponent } from './page/escritorio/escritorio.component';


import {APP_ROUTING} from './app.router';
import { ListCliComponent } from './page/cliente/list-cli/list-cli.component';
import { NewCliComponent } from './page/cliente/new-cli/new-cli.component';
import { ListMaqComponent } from './page/maquina/list-maq/list-maq.component';
import { NewMaqComponent } from './page/maquina/new-maq/new-maq.component';
import { NewProComponent } from './page/promociones/new-pro/new-pro.component';
import { ListProComponent } from './page/promociones/list-pro/list-pro.component';
import { NewRecComponent } from './page/recargas/new-rec/new-rec.component';
import { ListRecComponent } from './page/recargas/list-rec/list-rec.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EscritorioComponent,
    ListCliComponent,
    NewCliComponent,
    ListMaqComponent,
    NewMaqComponent,
    NewProComponent,
    ListProComponent,
    NewRecComponent,
    ListRecComponent
  ],
  imports: [
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule ,
    BrowserModule ,
    APP_ROUTING,
    NbThemeModule.forRoot({ name: 'cosmic' }),
  ],
  providers: [NbSidebarService, NbMenuModule.forRoot().providers],
  bootstrap: [AppComponent ]
})
export class AppModule { }
