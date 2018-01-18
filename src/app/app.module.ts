import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import {

  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule, } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './component/menu/menu.component';
import { EscritorioComponent } from './page/escritorio/escritorio.component';

import {MaquinaService} from './services/maquina.service';
import {ClienteService} from './services/cliente.service';
import {TargetaService} from './services/targeta.service';
import {HorarioService} from './services/horario.service';


import {APP_ROUTING} from './app.router';
import { ListCliComponent } from './page/cliente/list-cli/list-cli.component';
import { NewCliComponent } from './page/cliente/new-cli/new-cli.component';
import { ListMaqComponent } from './page/maquina/list-maq/list-maq.component';
import { NewMaqComponent } from './page/maquina/new-maq/new-maq.component';
import { NewProComponent } from './page/promociones/new-pro/new-pro.component';
import { ListProComponent } from './page/promociones/list-pro/list-pro.component';
import { NewRecComponent } from './page/recargas/new-rec/new-rec.component';
import { ListRecComponent } from './page/recargas/list-rec/list-rec.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HorariosComponent } from './page/promociones/horarios/horarios.component';
import { NewTarjComponent } from './page/tarjetas/new-tarj/new-tarj.component';
import { ListTarjComponent } from './page/tarjetas/list-tarj/list-tarj.component';


const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NgbModule,
];

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
    ListRecComponent,
    HorariosComponent,
    NewTarjComponent,
    ListTarjComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    NB_MODULES,
    BrowserModule ,
    APP_ROUTING,
    NgbModule.forRoot(),
    NbThemeModule.forRoot({ name: 'cosmic' }),
  ],
  providers: [NbSidebarModule.forRoot().providers, NbMenuModule.forRoot().providers, MaquinaService, ClienteService, HorarioService, TargetaService],
  bootstrap: [AppComponent ]
})



export class AppModule { }
