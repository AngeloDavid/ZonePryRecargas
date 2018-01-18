import { Injectable } from '@angular/core';
import {Maquina} from '../interfaces/maquina';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MaquinaService {

  urlServer = 'http://192.168.0.101:1337/Maquina';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newMaquina(maqui: Maquina) {
    const cuerpo = JSON.stringify(maqui);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editMaquina(maqui: Maquina, id: string) {
    const cuerpo = JSON.stringify(maqui);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo );

  }

  getMaquina(id: string) {
    return this._http.get<Maquina>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllMaqu() {
    return this._http.get <Maquina>(this.urlServer) ;
  }
  deleteMaqu(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );
  }




}
