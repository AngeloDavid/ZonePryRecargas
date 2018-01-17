import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

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
      columnTitle: 'Acciones'
    },
    mode: 'external',
    noDataMessage: 'Sin clientes encontrados',
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Tarjetas'
      },
      username: {
        title: 'Cliente'
      },
      email: {
        title: 'Cantidad'
      }
    }
  };
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/recarga/nuevo']);
  }

}
