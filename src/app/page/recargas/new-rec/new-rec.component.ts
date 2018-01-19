import { Component, OnInit } from '@angular/core';
import {PromocionService} from '../../../services/promocion.service';
import {TargetaService} from '../../../services/targeta.service';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {Cliente} from '../../../interfaces/cliente';
import {Recargas} from '../../../interfaces/recargas';
import {RecargasService}from  '../../../services/recargas.service';

@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.scss']
})
export class NewRecComponent implements OnInit {
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
    abono: 5,
    total: 5,
    saldo: 3,
    credito: 2,
    observaciones: ''
  };

  edadCliente: any;
  userCliente: any;
  disabledGuardar: boolean = true;
  constructor(private promList: PromocionService,
  private  urlCard: TargetaService, private recarSer: RecargasService
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
          //console.log(resp.objeto);
          if (resp) {
            this.Clienten.cedula = resp.cliente.cedula;
            this.Clienten.nombre = resp.cliente.nombre;
            this.Clienten.apellido = resp.cliente.apellido;
            this.Clienten.fecha_nacimiento = resp.cliente.fecha_nacimiento;

            this.userCliente = this.Clienten.nombre + ' ' +this.Clienten.apellido;
            this.edadCliente =this.calcularEdad(this.Clienten.fecha_nacimiento);

            this.Tarjetan.description = resp.objeto.description;
            this.Tarjetan.saldo = resp.objeto.saldo;
            this.Tarjetan.creditos = resp.objeto.creditos;
            this.Tarjetan.fecha_vencimiento =  resp.objeto.fecha_vencimiento;
            this.Tarjetan.islimitado = resp.objeto.islimitado;
            this.Tarjetan.id = resp.objeto.id ;
            this.disabledGuardar = false;
          }
          //console.log(this.Clienten);
        }
      );
    }
  }

  calcularEdad(fecha): number {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  abonos(id: number) {
    for (let dato of this.datosRecarga){
      if(dato.abono == id){
           let cant = this.recargaItem.promocionFk.cantidad;
           let oper = this.recargaItem.promocionFk.operacion;

           switch (oper) {
             case '*':
                this.recargaItem.total = dato.abono * cant;
                this.recargaItem.saldo = dato.saldo;
                this.recargaItem.credito = dato.credito;
                break;

           }
      }
    }
  }

  Guardar(): void {
    this.recargaItem.tarjetaFk = this.Tarjetan;
    console.log(this.recargaItem);
    // let datos = {
    //   'saldo': this.recargaItem.saldo + this.Tarjetan.saldo,
    //   'creditos':this.recargaItem.credito + this.Tarjetan.creditos,
    //   'fecha_UltimoMovimiento': new Date()
    // };
    //
    // console.log(datos);
    console.log(this.Tarjetan);
    this.recarSer.newRecarga(this.recargaItem).subscribe(
      resp =>{
        let datos = {
          'saldo': this.recargaItem.saldo + this.Tarjetan.saldo,
          'creditos':this.recargaItem.credito + this.Tarjetan.creditos,
          'fecha_UltimoMovimiento': new Date()
        };
        this.urlCard.editSaldo(datos,this.Tarjetan.id+ '').subscribe(
          resp => {
            console.log('datos actualizados');
          }
        )
      }
    );

  }
}
