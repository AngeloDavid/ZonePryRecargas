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

  id: string;
  maquinaItem: Maquina = {
    description: '',
    tarifa: 0,
    tipo: 'saldo',
    estado: true
  };
  constructor( private maqser: MaquinaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.maqser.getMaquina(this.id).subscribe(
            resultado => {
              this.maquinaItem = resultado;
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
        this.maqser.newMaquina(this.maquinaItem).subscribe(
          resultado => {
            console.log('registrado', resultado);
            // this._router.navigate(['/maquina', resultado.id]);
            this._router.navigate(['/maquinas']);
          }
        );
      } else {
        this.maqser.editMaquina(this.maquinaItem, this.id).subscribe(
          resultado => {
            console.log('editado');
            this._router.navigate(['/maquinas']);
          }
        );
      }
  }

  regresar() {
    this._router.navigate(['/maquinas']);
  }
}
