import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClienteService} from '../../../services/cliente.service';
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
      cedula: {
        title: 'Cédula'
      },
      nombre: {
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
      estado: {
        title: 'Estado'
      },
      tarjetas: {
        title: 'Tarjetas',
        type: 'html'
      }
    }
  };
  datos: any;

  constructor(private maqser: ClienteService,
              private _router: Router) {
    this.getAllMAqui();
  }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/cliente/nuevo']);
  }

  editarMaq(event): void {
    console.log('editar');
    console.log(event.data.id);
    this._router.navigate(['/cliente', event.data.id]);
  }
  deleteMaqui(event): void {
    console.log(event.data);
    this.maqser.deleteCli(event.data.estado, event.data.id).subscribe(
      resultado => {
        this.getAllMAqui();
      }
    );
  }

  getAllMAqui(): void {
    this.maqser.getAllCli().subscribe(
      resultado => {
        this.datos = resultado;
        let numTarj:any=0;
        let saldoTarj:any=0;
        let creditoTarj:any=0;
        
        for (let i in resultado) {

          //Calculo total de saldo - credito de las tarjetas
          for (let j in this.datos[i]['tarjetas']) {
            if( this.datos[i]['tarjetas'][j]['estado'] === true ){
              numTarj=numTarj+1;
              saldoTarj = saldoTarj + this.datos[i]['tarjetas'][j]['saldo'];
              creditoTarj = creditoTarj + this.datos[i]['tarjetas'][j]['creditos'];
            }
          }
          this.datos[i]['tarjetas'] = "# "+numTarj+" <br>sal. $"+saldoTarj+" "+" <br>cred. $"+creditoTarj;
          numTarj=0;
          saldoTarj=0;
          creditoTarj=0;
          
          //Seteando valor estado
          if(this.datos[i]['estado'] === false)
            this.datos[i]['estado']= "Inactivo";
          else
            this.datos[i]['estado']= "Activo";
        }
      }
    );
  }


}
