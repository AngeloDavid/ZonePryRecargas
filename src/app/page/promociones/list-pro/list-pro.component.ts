import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PromocionService} from '../../../services/promocion.service';
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
      titulo: {
        title: 'Titulo '
      },
      decripcion: {
        title: 'Descripcion'
      },
      cantidad: {
        title: 'Cantidad'
      },
      operacion: {
        title: 'Operacion'
      },
      createdAt: {
        title: 'Fecha de Creación'
      },
      fecha_vencimiento: {
        title: 'Fecha de Vencimiento'
      },
      fecha_Activacion: {
        title: 'Fecha de Activación'
      },
      estado: {
        title: 'Estado'
      },
      horarioFk: {
        title: 'Horario'
      }
    }
  };
  datos: any;
  constructor(private maqser: PromocionService,
              private _router: Router) {
    this.getAllPromociones();
  }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/promocion/nuevo']);
  }

  editarMaq(event): void {
    console.log('editar');
    console.log(event.data.id);
    this._router.navigate(['/promocion', event.data.id]);
  }
  deleteMaqui(event): void {
    console.log(event.data);
    this.maqser.deletePromocion(event.data.estado, event.data.id).subscribe(
      resultado => {
        this.getAllPromociones();
      }
    );
  }

  getAllPromociones(): void {
    this.maqser.getAllPromocion().subscribe(
      resultado => {
        this.datos = resultado;
      }
    );
  }

}
