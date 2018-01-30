import { Component, OnInit } from '@angular/core';
import {Maquina} from '../../../interfaces/maquina';
import {MaquinaService} from '../../../services/maquina.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-new-maq',
  templateUrl: './new-maq.component.html',
  styleUrls: ['./new-maq.component.css']
})
export class NewMaqComponent implements OnInit {

  id: string;
  config: ToasterConfig  = new ToasterConfig({
    showCloseButton: true,
    animation: 'flyRight',
    preventDuplicates :true,
    tapToDismiss: false,
    newestOnTop: false,
    positionClass: 'toast-top-right',
    timeout : 10000,
    limit : 5
  });

  maquinaItem: Maquina = {
    intentos:1,
    description: '',
    tarifa: 0,
    tipo: 'saldo',
    estado: true
  };
  constructor( private maqser: MaquinaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute,
               private toasterService: ToasterService
  ) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.maqser.getMaquina(this.id).subscribe(
            resultado => {
              this.maquinaItem = resultado;
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  popToast(tipo: string, titulo: string, cuerpo: string) {
    const toast: Toast = {
      type: tipo,
      title: titulo,
      body: cuerpo ,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  guardar() {
    if(this.maquinaItem.tarifa <= 0 || this.maquinaItem.intentos <= 0 ){
      this.popToast('warning','Error!!', 'La tarifa de la maquina y el numero de intentos no debe ser un numero <=0');
    }else
    if (this.maquinaItem.description == '' || this.maquinaItem.tarifa == null || this.maquinaItem.intentos == null){
      this.popToast('error', 'Error!! registro de maquina', 'Todos los campos son obligatorios');
    } else
      if (this.id == 'nuevo') {
        this.maqser.newMaquina(this.maquinaItem).subscribe(
          resultado => {
            console.log('registrado', resultado);
            this.popToast('success', 'Registro exitoso!! ', 'Nueva Máquina ingresada existosamente');
          },
          err =>{
            this.popToast('error', 'Error!! Registro de maquina', 'Problemas con el servidor principal. Codigo: '+err.error.code);
          }

        );
      } else {
        this.maqser.editMaquina(this.maquinaItem, this.id).subscribe(
          resultado => {
            console.log('editado');
            this.popToast('success', 'Actualización exitosa!! ', 'Informacion de la máquina Actulizada correctamente');
          } ,
          err =>{
            this.popToast('error', 'Error!! Registro de maquina', 'Problemas con el servidor principal. Codigo: '+err.error.code);
          }
        );
      }
  }

  regresar() {
    this._router.navigate(['/maquinas']);
  }
}
