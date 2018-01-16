import { Component, OnInit } from '@angular/core';
import {Maquina} from '../../../interfaces/maquina';
import {MaquinaService} from '../../../services/maquina.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-maq',
  templateUrl: './new-maq.component.html',
  styleUrls: ['./new-maq.component.css']
})
export class NewMaqComponent implements OnInit {

  isnuevo: boolean ;
  id:string;
  showIntetntos = '';
  showTime = 'hidden';
  maquinaItem: Maquina ={
    description: '',
    tarifa: 0,
    estado: true
  };
  constructor( private maqser: MaquinaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(
      parametros =>{
        this.id = parametros['id'];
        console.log('nuevo');
        if (this.id != 'nuevo') {
          this.maqser.getMAquina(this.id).subscribe(
            resultado =>{
              this.maquinaItem= resultado;
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  cambiar(Valor) {
       if (Valor == 1) {
         this.showIntetntos = 'hidden' ;
         this.showTime = '';
       } else {
         this.showIntetntos = '' ;
         this.showTime = 'hidden';
       }
  }
  guardar() {
      if (this.isnuevo) {
        this.maqser.newMaquina(this.maquinaItem).subscribe(
          resultado => {
            console.log('registrado');
          }
        );
      } else {
        this.maqser.editMaquina(this.maquinaItem,this.id).subscribe(
          resultado =>{
            console.log('editado');
          }
        );
      }
  }

}
