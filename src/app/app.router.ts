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
import { NewRecComponent } from './page/recargas/new-rec/new-rec.component';
import { ListRecComponent } from './page/recargas/list-rec/list-rec.component';


const APP_ROUTES: Routes = [
  {path: 'home' , component: EscritorioComponent},
  {path: 'recarga/nuevo', component: NewRecComponent},
  {path: 'recarga/Lista', component: ListRecComponent},
  {path: 'maquina/:id', component: NewMaqComponent},
  {path: 'maquina/Lista', component: ListProComponent},
  {path: 'promociones/nuevo', component: NewProComponent},
  {path: 'promociones/Lista', component: ListMaqComponent},
  {path: 'cliente/nuevo', component: NewCliComponent},
  {path: 'cliente/Lista', component: ListCliComponent},
  {path: '**' , pathMatch: 'full', redirectTo: 'home'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
