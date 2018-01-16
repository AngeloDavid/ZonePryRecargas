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
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*'
    });

    return this._http.post(this.urlServer, cuerpo , { headers: cabecera })
      .map(
        res => {
          console.log(res.json());
          return res.json();
        }
      );
  }

  editMaquina(maqui: Maquina, id:string){
    const cuerpo = JSON.stringify(maqui);
    const cabecera = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    return this._http.post(this.urlServer + '/' + id, cuerpo ).map(
      resp => {
        return resp.json();
      }
    );
  }

  getMAquina(id: string) {
    const cabecera = new HttpHeaders( {
      'Content-Type': 'application/json'
    });
    return this._http.get<Maquina>(this.urlServer + '/' + id, { headers: cabecera }).map(
      resp => {
        return resp.json();
      }
    );
  }
  getAllMaqu() {
    return this._http.get <Maquina>(this.urlServer).map(
       res => {
         console.log(res.json());
         return res.json();
       }
    ) ;
  }




}
