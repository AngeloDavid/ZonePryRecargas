import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../interfaces/cliente';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {ClienteService} from '../../../services/cliente.service';
import {TargetaService} from '../../../services/targeta.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-cli',
  templateUrl: './new-cli.component.html',
  styleUrls: ['./new-cli.component.css']
})
export class NewCliComponent implements OnInit {



  id: string;
  clienteItem: Cliente = {
    cedula: '',
    nombre: '' ,
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: true
  };
  targetaItem: Tarjetas = {
    description: '',
    saldo: 2,
    creditos: 3,
    fecha_Activacion: new  Date(),
    tipo: 'normal',
    islimitado: true,
    estado: true ,
    userFk:this.clienteItem
  } ;
  constructor(
    private maqser: ClienteService,
    private targser: TargetaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.maqser.getCliente(this.id).subscribe(
            resultado => {
              this.clienteItem = resultado;
              if (this.clienteItem.tarjetas.length != 0)
              {
                this.targetaItem = this.clienteItem.tarjetas[0];
                console.log(this.targetaItem);
              }

            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  guardar() {
    if (this.id == 'nuevo') {
      if (this.clienteItem.cedula == '' || this.targetaItem.description== ''){
        alert('Cliente y targeta vacios');
      }else {
        console.log(this.targetaItem);
        this.maqser.newCliente(this.clienteItem).subscribe(
          resultado => {
            console.log('registrado', resultado);
          }
        );
      }
    } else {
      this.maqser.editCliente(this.clienteItem, this.id).subscribe(
        resultado => {
          console.log('editado');
        }
      );
    }
  }

  regresar() {
    this._router.navigate(['/clientes']);
  }
}
