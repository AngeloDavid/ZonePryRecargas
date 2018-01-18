import { Component, OnInit } from '@angular/core';
import {PromocionService} from '../../../services/promocion.service';


@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.scss']
})
export class NewRecComponent implements OnInit {
  Promociones:any;


  constructor(private promList: PromocionService) {
    this.promList.getAllPromocion().subscribe(
      resp => {
        this.Promociones =resp;
      }
    );
  }

  ngOnInit() {
  }

}
