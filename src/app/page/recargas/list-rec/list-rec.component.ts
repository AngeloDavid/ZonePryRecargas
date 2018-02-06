import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {RecargasService} from  '../../../services/recargas.service';
import {TargetaService} from  '../../../services/targeta.service';
import  {LocalDataSource} from '../../../../../node_modules/ng2-smart-table';
import  {revisarFecha, formatYMDFecha, onPrint} from '../../../component/tools';
@Component({
  selector: 'app-list-rec',
  templateUrl: './list-rec.component.html',
  styleUrls: ['./list-rec.component.css']
})
export class ListRecComponent implements OnInit {


  userCliente: any;
  searchDate: string;
  Totales: any = [{
    "name": "Abono",
    "value": 0
  },
    {
      "name": "Saldo",
      "value": 0
    }];

  Tarjetan: any = {
    description: '',
    creditos: null,
    saldo: null,
    tipo: '',
    estado: true
  };
  Clienten: any = {
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: true,
  };
  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
      confirmCreate: false
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-print"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      edit: false,
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
      },
      createdAt: {
        title: 'Fecha',

      },
      hora: {
        title: 'Hora'
      }
    }
  };
  datos:any;
  souces: LocalDataSource;
  constructor(private _router: Router,private recarSer: RecargasService,private  targetaSer: TargetaService) {
         this.recarSer.getAllRec().subscribe(
           resultado => {
             this.searchDate= revisarFecha (new Date());
             this.datos = resultado;
             // this.datos.setSort([{ field: 'id', direction: 'desc' }]);
             this.Totales[0].value=0;
             this.Totales[1].value=0;

             for (let i in resultado) {
               if (this.datos[i]['tarjetaFk'])
                  this.datos[i]['tarjetaFk']= resultado[i]['tarjetaFk']['description'];
               if (this.datos[i]['promocionFk'])
                  this.datos[i]['promocionFk']= resultado[i]['promocionFk']['titulo'];
               if (this.datos[i]['id'])
                  this.datos[i]['id']=this.recarSer.codificar(resultado[i]['id'], 4 );
               if(this.datos[i]['createdAt']) {
                 let fecha = new Date(resultado[i]['createdAt']);
                 this.datos[i]['hora'] = fecha.toLocaleTimeString();
                 this.datos[i]['createdAt'] = fecha.toLocaleDateString();
               }
             }
             console.log(this.Totales);
             this.souces = new LocalDataSource(this.datos);
             this.souces.setFilter([ { field: 'createdAt', search: formatYMDFecha(this.searchDate).toLocaleDateString() } ]);
             this.souces.setSort([ { field: 'id', direction: 'desc'  } ]);
             this.ImprimitTotales();
           }
         );
  }

  ngOnInit() {
  }

  addMaqui(): void {
    this._router.navigate(['/recarga/nuevo']);
  }
  buscar(query: string ="") {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!query.match(regEx)) return null;  // Invalid format
    let fecha  = new Date(query);
    fecha.setDate(fecha.getDate() + 1);
    console.log(query, fecha);
    this.souces.setFilter([
      {field: 'createdAt',
        search: fecha.toLocaleDateString() }
    ]);
    this.ImprimitTotales();
  }
  ImprimitTotales()
  {
    this.Totales[0].value = 0;
    this.Totales[1].value = 0;

    this.souces.getFilteredAndSorted().then( resp =>{
      for (const fsDatos of resp ) {
        this.Totales[0].value += fsDatos.abono;
        this.Totales[1].value += fsDatos.saldo;
      }
    });
  }
  onPrint(event): any {

    console.log( event.data);
    let fechacreate = new Date(event.data.createdAt)
    this.targetaSer.getTarID(event.data.tarjetaFk).subscribe(
     resp=> {
       if (resp && resp.error) {
         console.log(resp);
         this.Clienten.cedula = resp.cliente.cedula;
         this.Clienten.nombre = resp.cliente.nombre;
         this.Clienten.apellido = resp.cliente.apellido;
         this.Clienten.fecha_nacimiento = resp.cliente.fecha_nacimiento;
         this.Clienten.telefono = resp.cliente.telefono;
         this.Clienten.direccion = resp.cliente.direccion;

         this.userCliente = this.Clienten.nombre + ' ' + this.Clienten.apellido;

         this.Tarjetan.description = resp.objeto.description;
         this.Tarjetan.saldo = resp.objeto.saldo;
         this.Tarjetan.creditos = resp.objeto.creditos;
         this.Tarjetan.fecha_vencimiento =  resp.objeto.fecha_vencimiento;
         this.Tarjetan.islimitado = resp.objeto.islimitado;
         this.Tarjetan.id = resp.objeto.id ;

       }

       let  popupWin;
       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
       popupWin.document.open();
       popupWin.document.write(`
      <html>
        <head>
          <title>Imprimir Recibo</title>
          <style>
          table{
          margin-top: 30px;
          margin-bottom: 25px;
          font-size: medium;
          border: 2px solid #000;
          }
          table tr td{
           border: 2px solid #000;
          }
          </style>
        </head>
          <body onload="window.print();window.close()">
            <h1>Recibo de Consumo</h1>
          <h3>Información del Cliente</h3>
          <table>
              <tr>
                <td>Cédula</td>
                <td>${this.Clienten.cedula}</td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>${this.userCliente}</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>${this.Clienten.telefono}</td>
              </tr>
              <tr>
                <td>Dirección</td>
                <td>${this.Clienten.direccion}</td>
                </tr>
           </table>
          <h3>Información del consumo</h3>
          <p> <strong># Consumo: </strong>  ${this.recarSer.codificar( event.data.id,4)} </p>
          <p> <strong># Fecha Consumo: </strong>  ${ fechacreate.toLocaleString()} </p>
          <table>
              <tr>
                <td>IDCard</td>
                <td>${this.Tarjetan.description}</td>
              </tr>
              <tr>
                <td>Abono</td>
                <td>${event.data.abono}</td>
              </tr>
              <tr>
                <td>Saldo</td>
                <td>${event.data.saldo}</td>
              </tr>
              <tr>
                <td>Observaciones</td>
                <td>${event.data.observaciones}</td>
              </tr>
          </table>
          </body>
      </html>`
       );
       popupWin.document.close();
     }
    );
  }


  allRrint() {
    this.souces.getFilteredAndSorted().then(
      resp => {
        let txtPrint = ' <h1> Informe Diarios: ' + (new Date()).toLocaleDateString() + ' </h1>';
        txtPrint += '<p>' + JSON.stringify(resp) + '</p>';
        txtPrint += '<p>' + JSON.stringify(this.Totales.toString())  + '</p>';
        onPrint('Informe Diario', '', txtPrint);
      }
    )

  }
}
