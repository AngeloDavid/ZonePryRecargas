import { Component, OnInit } from '@angular/core';
import {PromocionService} from '../../../services/promocion.service';
import {TargetaService} from '../../../services/targeta.service';
import {Tarjetas} from '../../../interfaces/tarjetas';
import {Cliente} from '../../../interfaces/cliente';

@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.scss']
})
export class NewRecComponent implements OnInit {
  Promociones:any;
  Tarjetan: Tarjetas = {
    description: '',
    creditos: 0,
    saldo: 0,
    tipo: '',
    estado: true
  };
  Clienten: Cliente;

  constructor(private promList: PromocionService,
  private  urlCard: TargetaService) {
    this.promList.getAllPromocion().subscribe(
      resp => {
        this.Promociones =resp;
      }
    );
  }

  ngOnInit() {
  }
  buscar(idcard: string) {
    this.urlCard.getTarID(idcard).subscribe(
      resp =>{
        console.log(resp);
        /*this.Tarjetan = resp.objeto;
         this.Clienten = resp.Cliente;*/
      }
    );
  }

}
