import { Component, OnInit } from '@angular/core';
import  {revisarFecha,formatYMDFecha,onPrint} from '../../../component/tools';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  fechaInicio :string;
  fechaFinal: string;
  constructor() {
    let hoy = new Date() ;
    let unmes  = new Date() ;
    unmes.setMonth(  hoy.getMonth() + 1);
    this.fechaInicio = revisarFecha(hoy);
    this.fechaFinal = revisarFecha(unmes);

  }

  ngOnInit() {
  }

}
