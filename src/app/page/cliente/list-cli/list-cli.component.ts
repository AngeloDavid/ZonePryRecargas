import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-cli',
  templateUrl: './list-cli.component.html',
  styleUrls: ['./list-cli.component.css']
})
export class ListCliComponent implements OnInit {

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
        title: 'Cédula'
      },
      name: {
        title: 'Nombre '
      },
      apellido: {
        title: 'Apellido'
      },
      fecha_nacimiento: {
        title: 'Fecha Nacimiento'
      },
      telefono: {
        title: 'Teléfono'
      },
      email: {
        title: 'E-mail'
      },
      direccion: {
        title: 'Dirección'
      },
      Tarjeta: {
        title: 'Tarjetas'
      }
    }
  };
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/cliente/nuevo']);
  }
}
