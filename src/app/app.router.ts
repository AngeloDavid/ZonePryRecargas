/**
 * Created by angel on 15/01/2018.
 */

import  {Routes, RouterModule} from '@angular/router' ;
import { EscritorioComponent } from './page/escritorio/escritorio.component';
import { ListCliComponent } from './page/cliente/list-cli/list-cli.component';
import { NewCliComponent } from './page/cliente/new-cli/new-cli.component';
import { ListMaqComponent } from './page/maquina/list-maq/list-maq.component';
import { NewMaqComponent } from './page/maquina/new-maq/new-maq.component';
import { NewProComponent } from './page/promociones/new-pro/new-pro.component';
import { ListProComponent } from './page/promociones/list-pro/list-pro.component';
import { HorariosComponent } from './page/promociones/horarios/horarios.component';
import { NewRecComponent } from './page/recargas/new-rec/new-rec.component';
import { ListRecComponent } from './page/recargas/list-rec/list-rec.component';
import  {ListTarjComponent} from  './page/tarjetas/list-tarj/list-tarj.component';
import {NewTarjComponent} from  './page/tarjetas/new-tarj/new-tarj.component';
import { VentasComponent } from './page/reportes/ventas/ventas.component';
import {LoginComponent} from  './page/login/login.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


const APP_ROUTES: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {path: 'home' , component: EscritorioComponent},
  {path: 'recarga/nuevo', component: NewRecComponent},
  {path: 'recarga/Lista', component: ListRecComponent},
  {path: 'maquina/:id', component: NewMaqComponent},
  {path: 'maquinas', component: ListMaqComponent},
  {path: 'promocion/:id', component: NewProComponent},
  {path: 'promociones', component: ListProComponent },
  {path: 'Horarios', component: HorariosComponent },
  {path: 'cliente/:id', component: NewCliComponent},
  {path: 'clientes', component: ListCliComponent},
  {path: 'tarjeta/:id', component: NewTarjComponent},
  {path: 'tarjetas', component: ListTarjComponent},
  {path: 'Ventas', component: VentasComponent},
  {path: '**' , pathMatch: 'full', redirectTo: 'auth/login'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
