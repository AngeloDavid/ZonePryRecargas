import { Component, OnInit } from '@angular/core';
import {Promocion} from '../../../interfaces/promocion';
import {HorarioService} from '../../../services/horario.service';
import {PromocionService} from '../../../services/promocion.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-new-pro',
  templateUrl: './new-pro.component.html',
  styleUrls: ['./new-pro.component.css']
})
export class NewProComponent implements OnInit {

  id = '';
  promocionItem: Promocion = {
    titulo: '',
    decripcion: '',
    cantidad: 1,
    aplica_a: 'recarga',
    operacion: '*',
    estado: true
  };
  ListHorarios: any;
  constructor(private maqser: HorarioService,
              private targser: PromocionService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id != 'nuevo') {
          this.targser.getPromocion(this.id + '').subscribe(
            resultado => {
              this.promocionItem = resultado;
              console.log(this.promocionItem);
            }
          );
        }
        this.maqser.getAllHora().subscribe(
          resp => {
            this.ListHorarios = resp;
          }
        );
      }
    );
  }

  ngOnInit() {
  }


  guardar(): void {
    if (this.id == 'nuevo') {
      console.log(this.promocionItem);
      this.targser.newPromocion(this.promocionItem).subscribe(
        resp => {
          console.log(resp);
        }
      );
    } else {
      this.targser.editPromocion(this.promocionItem, this.promocionItem.id + '' ).subscribe(
        resp => {console.log('Dato Actualizado');});
    }
  }
}
