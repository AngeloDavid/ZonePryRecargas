import { Component, OnInit } from '@angular/core';
import {PromocionService} from '../../../services/promocion.service';
import {TargetaService} from '../../../services/targeta.service';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {Cliente} from '../../../interfaces/cliente';
import {Recargas} from '../../../interfaces/recargas';
import {RecargasService}from  '../../../services/recargas.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.scss']
})
export class NewRecComponent implements OnInit {

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

  Promociones: any;
  Tarjetan: Tarjetas = {
    description: '',
    creditos: null,
    saldo: null,
    tipo: '',
    estado: true
  };
  Clienten: Cliente = {
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: true,
  };
  datosRecarga: any = [ {
    abono: 5,
    saldo: 3,
    credito: 2
  }, {
    abono: 10,
    saldo: 5 ,
    credito: 10
  },
    {
      abono: 20,
      saldo: 10,
      credito: 15
    }
  ];

  recargaItem: Recargas={
    abono: null,
    total: null,
    saldo: null,
    credito: null,
    observaciones: ''
  };

  edadCliente: any;
  userCliente: any;
  disabledGuardar: boolean = true;
  disabledImprinir: boolean = true;
  popupWin;

  constructor(private promList: PromocionService,
  private  urlCard: TargetaService, private recarSer: RecargasService,private toasterService: ToasterService
  ) {
    this.promList.getAllPromocion().subscribe(
      resp => {
        this.Promociones =resp;
      }
    );
  }

  ngOnInit() {
  }
  buscar(idcard: string) {
    if (idcard == '') {
      this.Clienten  = {
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion: '',
        estado: true,
      };
      this.Tarjetan = {
        description: '',
        creditos: null,
        saldo: null,
        tipo: '',
        estado: true
      };
      this.edadCliente = '';
      this.userCliente = '';
      this.disabledGuardar = true;
    } else {
      this.urlCard.getTarID(idcard).subscribe(
        resp => {
          // console.log(resp.objeto);
          if (resp && resp.error) {
            this.Clienten.cedula = resp.cliente.cedula;
            this.Clienten.nombre = resp.cliente.nombre;
            this.Clienten.apellido = resp.cliente.apellido;
            this.Clienten.fecha_nacimiento = resp.cliente.fecha_nacimiento;
            this.Clienten.telefono = resp.cliente.telefono;
            this.Clienten.direccion = resp.cliente.direccion;

            this.userCliente = this.Clienten.nombre + ' ' +this.Clienten.apellido;
            this.edadCliente =this.calcularEdad(this.Clienten.fecha_nacimiento);

            this.Tarjetan.description = resp.objeto.description;
            this.Tarjetan.saldo = resp.objeto.saldo;
            this.Tarjetan.creditos = resp.objeto.creditos;
            this.Tarjetan.fecha_vencimiento =  resp.objeto.fecha_vencimiento;
            this.Tarjetan.islimitado = resp.objeto.islimitado;
            this.Tarjetan.id = resp.objeto.id ;
            this.disabledGuardar = false;
          } else {
           this.popToast('warning', 'Error!!', 'Tarjeta Virtual no encontrada');
          }
          // console.log(this.Clienten);
        }
      );
    }
  }

  calcularEdad(fecha): number {
    console.log("calcuila edad",fecha);
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!fecha.match(regEx)) return null;  // Invalid format
    let cumpleanos  = new Date(fecha);
    //console.log(fecha, cumpleanos);
    let hoy = new Date();
    // let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();

    let m = hoy.getMonth() - cumpleanos.getMonth();
    //console.log(edad,m);
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  abonos(id: number) {
    for (let dato of this.datosRecarga) {
      if(dato.abono == id) {
           /*let cant = this.recargaItem.promocionFk? this.recargaItem.promocionFk.cantidad: 1 ;
           let oper = this.recargaItem.promocionFk ? this.recargaItem.promocionFk.operacion:'*' ;

           switch (oper) {
             case '*':
                this.recargaItem.total = dato.abono * cant;
                this.recargaItem.saldo = dato.saldo;
                this.recargaItem.credito = dato.credito;
                break;

           }*/
        this.recargaItem.saldo = dato.abono;
      }
    }
  }

  Guardar(): void {
    this.recargaItem.tarjetaFk = this.Tarjetan;
    console.log(this.recargaItem);
    if (this.recargaItem.abono == null)
    {
        this.popToast('error', 'Error!! al registro del consumo', 'El campo abono no puede estar en blanco');
    } else{
      console.log(this.recargaItem.saldo);
      this.recarSer.newRecarga(this.recargaItem).subscribe(
        resp => {
          console.log(resp);
          /*let datos = {
            'saldo': this.recargaItem.saldo + this.Tarjetan.saldo,
            'creditos':this.recargaItem.credito + this.Tarjetan.creditos,
            'fecha_UltimoMovimiento': new Date()
          };*/
          let datos = {
            'saldo': this.recargaItem.saldo ,
            'creditos':this.recargaItem.credito,
            'fecha_UltimoMovimiento': new Date()
          };
          this.recargaItem.id= resp.id;

          this.urlCard.editSaldo(datos,this.Tarjetan.id+ '').subscribe(
            resp => {
              this.popToast('success', 'Registro Exitoso!!', 'Nuevo consumo registrado con exito');
              this.disabledImprinir = false;
            },
            error => {
              this.popToast('error', 'Error!!', 'Ingrese la informacion correcta para registrar el consumo');
            }

          );
        },
        error => {
          this.popToast('error', 'Error!!', 'Ingrese la informacion correcta para registrar el consumo');
        }
      );
    }
  }

  CalcularSaldo(saldoAnterior) {
    // console.log(this.recargaItem.abono);
    let abono: number = Number(this.recargaItem.abono ? Number( this.recargaItem.abono ) : 0 );
    let saldo_anterior: number = Number(saldoAnterior ?  Number( saldoAnterior + '' ) : 0 );
    this.recargaItem.saldo = abono + saldo_anterior ;
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

  print(): void {
    let fechacreate = new Date(this.recargaItem.createdAt);
    this.popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    this.popupWin.document.open();
    this.popupWin.document.write(`
      <html>
        <head>
          <title>Imprimir Recibo</title>
          <style>
          table{
          margin-top: 30px;
          margin-bottom: 25px;
          font-size: medium;
          border: 2px solid #000;
          }
          table tr td{
           border: 2px solid #000;
          }
          </style>
        </head>
          <body onload="window.print();window.close()">
          <h1>Recibo de Consumo</h1>
          <h3>Información del Cliente</h3>
          <table>
              <tr>
                <td>Cédula</td>
                <td>${this.Clienten.cedula}</td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>${this.userCliente}</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>${this.Clienten.telefono}</td>
              </tr>
              <tr>
                <td>Dirección</td>
                <td>${this.Clienten.direccion}</td>
                </tr>
           </table>
          <h3>Información del consumo</h3>
          <p> <strong># Consumo: </strong>  ${this.recarSer.codificar( this.recargaItem.id,4)} </p>
          <p> <strong># Fecha Consumo: </strong>  ${ fechacreate.toLocaleString()} </p>
          <table>
              <tr>
                <td>IDCard</td>
                <td>${this.Tarjetan.description}</td>
              </tr>
              <tr>
                <td>Abono</td>
                <td>${this.recargaItem.abono}</td>
              </tr>
              <tr>
                <td>Saldo Anterior</td>
                <td>${this.Tarjetan.saldo}</td>
              </tr>
              <tr>
                <td>Saldo</td>
                <td>${this.recargaItem.saldo}</td>
              </tr>
              <tr>
                <td>Observaciones</td>
                <td>${this.recargaItem.observaciones}</td>
              </tr>
          </table>
          </body>
      </html>`
    );
    this.popupWin.document.close();
  }
}
