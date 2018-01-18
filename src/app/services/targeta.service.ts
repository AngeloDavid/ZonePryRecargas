import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Tarjetas} from '../interfaces/tarjetas';

@Injectable()
export class TargetaService {

  urlServer = 'http://192.168.0.101:1337/Targeta';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newTarjetas(Clii: Tarjetas) {
    const cuerpo = JSON.stringify(Clii);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editTarjetas(Clii: Tarjetas, id: string) {
    const cuerpo = JSON.stringify(Clii);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo );

  }

  getTarjetas(id: string) {
    return this._http.get<Tarjetas>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllTar() {
    return this._http.get <Tarjetas>(this.urlServer) ;
  }
  deleteTar(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );
  }


}