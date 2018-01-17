import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css']
})
export class ListProComponent implements OnInit {

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
      id: {
        title: 'ID'
      },
      name: {
        title: 'Titulo '
      },
      apellido: {
        title: 'Descripcion'
      },
      fecha_nacimiento: {
        title: 'Cantidad'
      },
      telefono: {
        title: 'Operacion'
      },
      email: {
        title: 'Fecha de Creación'
      },
      direccion: {
        title: 'Fecha de Vencimiento'
      },
      Tarjeta: {
        title: 'Fecha de Activación'
      }
    }
  };
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/promociones/nuevo']);
  }


}
