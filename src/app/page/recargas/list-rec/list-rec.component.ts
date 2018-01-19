import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {RecargasService}from  '../../../services/recargas.service';

@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.component.html',
  styleUrls: ['./list-rec.component.css']
})
export class ListRecComponent implements OnInit {

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
      columnTitle: 'Acciones',
      edit: false,
      delete: false
    },
    mode: 'external',
    noDataMessage: 'Sin clientes encontrados',
    columns: {
      id: {
        title: 'ID'
      },
      abono: {
        title: 'Abono'
      },
      /*total: {
        title: 'Total'
      },*/
      saldo: {
        title: 'Saldo'
      },
      /*credito: {
        title: 'credito'
      },*/
      observaciones: {
        title: 'Observaciones'
      },
      tarjetaFk: {
        title: 'Tarjeta'
      },
      promocionFk: {
        title: 'Promocion'
      }
    }
  };
  datos:any;
  constructor(private _router: Router,private recarSer: RecargasService) {
         this.recarSer.getAllRec().subscribe(
           resultado=>{
             this.datos = resultado;

             for (let i in resultado) {
               if(this.datos[i]['tarjetaFk'])
                  this.datos[i]['tarjetaFk']= resultado[i]['tarjetaFk']['description'];
               if(this.datos[i]['promocionFk'])
                  this.datos[i]['promocionFk']= resultado[i]['promocionFk']['titulo'];
             }
           }
         );
  }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/recarga/nuevo']);
  }

}
