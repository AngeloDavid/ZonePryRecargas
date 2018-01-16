import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-maq',
  templateUrl: './new-maq.component.html',
  styleUrls: ['./new-maq.component.css']
})
export class NewMaqComponent implements OnInit {

  showIntetntos = '';
  showTime = 'hidden';
  constructor() { }

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

}
