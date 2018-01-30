import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Recargas} from '../interfaces/recargas';



@Injectable()
export class RecargasService {
  urlServer = 'http://localhost:1337/Recarga';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newRecarga(Clii: Recargas): any {
    const cuerpo = JSON.stringify(Clii);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editRecargas(Clii: Recargas, id: string): any{
    const cuerpo = JSON.stringify(Clii);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo );

  }

  getRecargas(id: string) {
    return this._http.get<Recargas>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllRec(): any {
    return this._http.get(this.urlServer) ;
  }
  deleteRec(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );

  }

  codificar(numero: string,limiti: number): string {
    let dato: string = numero + '';
    let leng: number = limiti - dato.length;
    dato = '';
    for(let i = 0 ; i < leng;i++){
      dato += '0';
    }
    return dato+=numero;
  }

}
