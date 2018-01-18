import { Component, OnInit } from '@angular/core';
import {Horario}  from  '../../../interfaces/horario';
import {HorarioService}  from '../../../services/horario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
      confirmeEdit: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      delete:false
    },
    noDataMessage: 'Sin Horarios encontrados',
    columns: {
      id: {
        title: 'ID'
      },
      dia: {
        title: 'Día'
      },
      hora_inicio: {
        title: 'Hora Incio',
      },
      hora_final: {
        title: 'Hora Final',
        editor: {
          type: 'time'
        }
      },
      estado: {
        title: 'estado',
        editor: {
          type: 'checkbox'
        }
      }
    }
  };
  data:any;

  constructor(private servicio: HorarioService) {
    this.servicio.getAllHora().subscribe(
      resp => {
        this.data = resp;
      }
    );
  }

  ngOnInit() {
  }

  guardar(event): void {
    console.log(event.newData);
    this.servicio.newHorario(event.newData).subscribe(
      resp => {
        event.confirm.resolve();
      }
    ) ;
  }
}
