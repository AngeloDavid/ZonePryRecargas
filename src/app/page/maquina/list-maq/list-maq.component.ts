import { Component, OnInit } from '@angular/core';
import {Maquina} from '../../../interfaces/maquina';
import {MaquinaService} from '../../../services/maquina.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-maq',
  templateUrl: './list-maq.component.html',
  styleUrls: ['./list-maq.component.css']
})
export class ListMaqComponent implements OnInit {

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
    },
    mode: 'external',
    noDataMessage: 'Sin máquina no encontrada',
    columns: {
      id: {
        title: 'ID'
      },
      description: {
        title: 'Descripcion'
      },
      tarifa: {
        title: 'Tarifa'
      },
      intentos: {
        title: '# Intentos'
      },
      tipo: {
        title: 'Tipo de cobro'
      },
      estado: {
        title: 'Estado'
      }
    }
  };
  datos: any;

  constructor(private maqser: MaquinaService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this.getAllMAqui();
  }

  ngOnInit() {
  }

  editarMaq(event): void {
    console.log('editar');
    console.log(event.data.id);
    this._router.navigate(['/maquina', event.data.id]);
  }

  addMaqui(): void{
     this._router.navigate(['/maquina/nuevo']);
  }

  deleteMaqui(event): void {
    console.log(event.data);
    this.maqser.deleteMaqu(event.data.estado, event.data.id).subscribe(
      resultado => {
        this.getAllMAqui();
      }
    );
  }

  getAllMAqui(): void{
    this.maqser.getAllMaqu().subscribe(
      resultado => {
        this.datos = resultado;

        for (let i in resultado) {
          if(this.datos[i]['estado'] === false)
            this.datos[i]['estado']= "Inactivo";
          else
            this.datos[i]['estado']= "Activo";
        }
      }
    );
  }
}
