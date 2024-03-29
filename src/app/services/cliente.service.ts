import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Cliente} from '../interfaces/cliente';
@Injectable()
export class ClienteService {

  urlServer = 'http://localhost:1337/Cliente';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newCliente(Clii: Cliente) {
    const cuerpo = JSON.stringify(Clii);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editCliente(Clii: Cliente, id: string) {
    const cuerpo = JSON.stringify(Clii);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo, { headers: this.cabecera } );

  }

  getCliente(id: string) {
    return this._http.get<Cliente>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllCli() {
    return this._http.get <Cliente>(this.urlServer, { headers: this.cabecera }) ;
  }
  deleteCli(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );
  }

}
