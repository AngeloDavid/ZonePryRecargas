import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../interfaces/cliente';
import {ClienteService} from '../../../services/cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {isUndefined} from "util";

@Component({
  selector: 'app-new-cli',
  templateUrl: './new-cli.component.html',
  styleUrls: ['./new-cli.component.css']
})

export class NewCliComponent implements OnInit {

  targetasArray: any;
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
  settings = {
    actions: {
      columnTitle: 'Acciones' ,
      add:false,
      edit:false,
      delete:false,
    },
    mode: 'external',
    noDataMessage: 'Sin tarjetas registradas para el cliente',
    columns: {
      description: {
        title: 'ID-Card'
      },
      creditos: {
        title: 'creditos '
      },
      saldo: {
        title: 'saldo'
      },
      fecha_vencimiento: {
        title: 'Fechade Vencimiento'
      },
      fecha_Activacion: {
        title: 'Fecha de activacion'
      },
      tipo: {
        title: 'Tipo de tarjeta'
      },
      islimitado: {
        title: 'Limite de saldo',
        type: 'html'
      },
      estado: {
        title: 'Estado'
      }
    }
  };
  datos: any;


  // identificador
  id: string;

  clienteItem: Cliente = {
    cedula: '',
    nombre: '' ,
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: true
  };




  constructor(
    private maqser: ClienteService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toasterService: ToasterService
  ) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.maqser.getCliente(this.id).subscribe(
            resultado => {
              this.clienteItem = resultado;
              this.targetasArray = this.clienteItem.tarjetas;
              if (this.clienteItem.tarjetas.length != 0)
              {
                this.datos = this.clienteItem.tarjetas;
                for (let i in this.clienteItem.tarjetas) {
                  if (this.datos[i]['estado'] === true)
                    this.datos[i]['estado'] = 'Activo';
                  else
                    this.datos[i]['estado'] = "Inactivo";
                  if(this.datos[i]['islimitado'] === true)
                    this.datos[i]['islimitado'] = '<i class="fa fa-check" aria-hidden="true"></i>';
                  else
                    this.datos[i]['islimitado'] = '<i class="fa fa-times" aria-hidden="true"></i>';
                }
                console.log(this.clienteItem.tarjetas.length);
              }

            }
          );
        } else {
          this.clienteItem = {
            id: null,
            cedula: '',
            nombre: '' ,
            apellido: '',
            telefono: '',
            email: '',
            direccion: '',
            estado: true
          };
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
    if (this.id == 'nuevo') {
      if (this.clienteItem.cedula == '' || this.clienteItem.nombre == ''|| this.clienteItem.apellido == '') {
        this.popToast('error', 'Error!! En registro de Cliente', 'Cedula o nombre o apellido vacios');
      } else {
        // console.log(this.targetaItem);
        this.maqser.newCliente(this.clienteItem).subscribe(
          resultado => {
            this.popToast('success', 'Registro Exitoso!!', 'Nuevo cliente ingresado correctamente');
          },
          error => {
          /*  ms= error.name == 'Error'?''  ;
            if( ) {

            }  else{

            }*/
            console.log();
            let ms = error.error.name == undefined ? 'Problema al conectarse con el servidor Principal' : 'Revise que la informacion ingresada se la correcta. Recuerde que la Cédula debe ser única.' ;
            this.popToast('error', 'Error!!  En registro de Cliente ' , ms);
          }
        );
      }
    } else {
      for (let i in this.targetasArray) {
        this.targetasArray[i]['estado'] = this.targetasArray[i]['estado'] == 'Activo'? true: false ;
        this.datos[i]['islimitado'] = this.datos[i]['islimitado'] == '<i class="fa fa-check" aria-hidden="true"></i>'? true: false;
      }
      this.clienteItem.tarjetas = this.targetasArray;
      console.log(this.clienteItem);
      this.maqser.editCliente(this.clienteItem, this.id).subscribe(
        resultado => {
          this.popToast('success', 'Actualización Exitosa!!', 'Información del cliente actualizado correctamente');
        },
        error => {
          this.popToast('error', 'Error!!  En Actualizacion de Cliente ' , 'Problema al conectarse con el servidor Principal' );
        }
      );
    }
  }

  regresar() {
    this._router.navigate(['/clientes']);
  }
}
