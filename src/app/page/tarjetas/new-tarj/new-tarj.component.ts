import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../interfaces/cliente';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {ClienteService} from '../../../services/cliente.service';
import {TargetaService} from '../../../services/targeta.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
@Component({
  selector: 'app-new-tarj',
  templateUrl: './new-tarj.component.html',
  styleUrls: ['./new-tarj.component.css']
})
export class NewTarjComponent implements OnInit {

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

  hoy = new  Date();
  id = '';
  targetaItem: Tarjetas = {
    description: '',
    saldo: 2,
    creditos: 3,
    // yyyy-MM-dd
    fecha_Activacion: this.revisarFecha(this.hoy) ,
    tipo: 'normal',
    islimitado: true,
    estado: true ,
  } ;
  listCliente:any ;



  constructor(
    private maqser: ClienteService,
    private targser: TargetaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute ,
    private toasterService: ToasterService
  ) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.targser.getTarjetas(this.id + '').subscribe(
            resultado => {
              this.targetaItem = resultado;
              console.log(this.targetaItem);
            }
          );
        }
        this.maqser.getAllCli().subscribe(
          resp => {
            this.listCliente = resp;
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  guardar(): void {
  console.log(this.targetaItem.saldo);
    if (this.targetaItem.islimitado == false && this.targetaItem.fecha_vencimiento == undefined) {
      this.popToast('warning', 'Error!! en registro de la tarjeta', 'Si la Tarjeta no tiene limite de saldo se debe selecionar una fecha de vencimiento');
    }else
    if (this.targetaItem.description == '' && this.targetaItem.userFk ==  null || ( (this.targetaItem.saldo <= 0 ||  this.targetaItem.saldo == null) ) ){
      this.popToast('error', 'Error!! en registro de la tarjeta', 'IDCard, saldo o usario vacios');
    } else
    if (this.id == 'nuevo') {
      this.targser.newTarjetas(this.targetaItem).subscribe(
        resp => {
          console.log(resp);
          this.popToast('success', 'Registro Exitoso!!! ', 'Nueva Tarjeta ingresada Correctamente');
        } ,
        error => {
          this.popToast('error', 'Error!! en registro de la tarjeta', 'Problema al conectarse con el servidor Principal');
        }
      );
    } else {
      this.targser.editTarjetas(this.targetaItem, this.targetaItem.id + '' ).subscribe(
          resp => {
            this.popToast('success', 'Actualización Exitosa!!', 'Informacion de la tarjeta actulizada corectamente');
            },
          error =>{
            this.popToast('error', 'Error!!  En Actualizacion de Cliente ' , ' Problema al conectarse con el servidor Principal');
          });
    }

  }

  cambiarCed():  void {
    this.targetaItem.description = this.targetaItem.userFk.cedula ;
  }

  revisarFecha(fecha:any) {
    console.log(fecha);
    console.log(fecha.getDay());
    let mes = (fecha.getMonth() + 1 ) < 10 ? '0' + (fecha.getMonth() + 1 ) : (fecha.getMonth() + 1 );
    let dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate();
    return (fecha.getFullYear() + '-' + mes + '-' + dia);
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

  regresar() {
    this._router.navigate(['/tarjetas']);
  }
}
