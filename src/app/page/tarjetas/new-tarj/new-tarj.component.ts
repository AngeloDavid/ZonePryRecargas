import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../interfaces/cliente';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {ClienteService} from '../../../services/cliente.service';
import {TargetaService} from '../../../services/targeta.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-new-tarj',
  templateUrl: './new-tarj.component.html',
  styleUrls: ['./new-tarj.component.css']
})
export class NewTarjComponent implements OnInit {

  id = '';
  targetaItem: Tarjetas = {
    description: '',
    saldo: 2,
    creditos: 3,
    fecha_Activacion: new  Date(),
    tipo: 'normal',
    islimitado: true,
    estado: true ,
  } ;
  listCliente:any ;



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
          this.targser.getTarjetas(this.id + '').subscribe(
            resultado => {
              this.targetaItem = resultado;
            }
          );
        }
        this.maqser.getAllCli().subscribe(
          resp => {
            this.listCliente = resp;
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  guardar(): void {
    if (this.id == 'nuevo') {
      this.targser.newTarjetas(this.targetaItem).subscribe(
        resp => {
          console.log(resp);
        }
      );
    } else {
      this.targser.editTarjetas(this.targetaItem, this.targetaItem.id + '' ).subscribe(
          resp => {console.log('Dato Actualizado')});
    }
  }
}
