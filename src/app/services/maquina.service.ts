import { Injectable } from '@angular/core';
import {Maquina} from '../interfaces/maquina';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MaquinaService {

  urlServer = 'http://localhost:1337/Maquina';
  constructor(private _http: HttpClientModule) {

  }

  nuevaMaquina(maqui: Maquina) {
    let cuerpo = JSON.stringify(maqui);
    let cabecera = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this._http.post(this.urlServer, cuerpo , { headers: cabecera })
      .map(
        res => {
          console.log(res.json());
          return res.json();
        }
      );
  }



}
