import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {Router} from '@angular/router';
import {TargetaService} from '../../../services/targeta.service';


@Component({
  selector: 'app-list-tarj',
  templateUrl: './list-tarj.component.html',
  styleUrls: ['./list-tarj.component.css']
})
export class ListTarjComponent implements OnInit {



  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
      confirmCreate: false
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones'
    },
    mode: 'external',
    noDataMessage: 'Sin clientes encontrados',
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
      },
      userFk: {
        title: 'Usuario',
        type: 'html',
      } ,
    }
  };

   data: Object = {
      description:"",
      creditos:"",
      saldo:"",
      fecha_vencimiento:"",
      fecha_Activacion:"",
      tipo:"",
      islimitado:"",
      estado:"",
      nombreUser:""
  };
  datos:any;

  constructor(private maqser: TargetaService, private  _router: Router   ) {
    this.getAllTarjetas();
  }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/tarjeta/nuevo']);
  }

  editarMaq(event): void {
    console.log('editar');
    console.log(event.data.id);
    this._router.navigate(['/tarjeta', event.data.id]);
  }
  deleteMaqui(event): void {
    console.log(event.data);
    this.maqser.deleteTar(event.data.estado, event.data.id).subscribe(
      resultado => {
        this.getAllTarjetas();
      }
    );
  }

  getAllTarjetas(): void {
    this.maqser.getAllTar().subscribe(
      resultado => {
        this.datos = resultado;
        //seteando valor usrFK
        for (let i in resultado) {

          console.log(resultado[i]['userFk']['id']);
          this.datos[i]['userFk'] =  resultado[i]['userFk']['nombre']+ " " + resultado[i]['userFk']['apellido'];

          if(this.datos[i]['estado'] === true)
               this.datos[i]['estado'] = "Activo";
          else
              this.datos[i]['estado'] = "Inactivo";

          if(this.datos[i]['islimitado'] === true)
               this.datos[i]['islimitado'] = '<i class="fa fa-check" aria-hidden="true"></i>';
          else
              this.datos[i]['islimitado'] = '<i class="fa fa-times" aria-hidden="true"></i>';

        }

      }
    );
  }
}



