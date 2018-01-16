import { Injectable } from '@angular/core';
import {Maquina} from '../interfaces/maquina';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MaquinaService {

  urlServer = 'http://localhost:1337/Maquina';
  constructor(private _http: HttpClient) {

  }

  newMaquina(maqui: Maquina) {
    const cuerpo = JSON.stringify(maqui);
    const cabecera = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this._http.post(this.urlServer, cuerpo , { headers: cabecera })
      .map(
        res => {
          console.log(res);
          return res;
        }
      );
  }

  editMaquina(maqui: Maquina, id:number){
    const cuerpo = JSON.stringify(maqui);
    const cabecera = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this._http.post(this.urlServer + '/' + id, cuerpo ).map(
      resp => {
        return resp;
      }
    );
  }
  getAllMaqu() {
    return this._http.get <Maquina>(this.urlServer).map(
       res => {
         console.log(res);
         return res;
       }
    ) ;
  }




}
