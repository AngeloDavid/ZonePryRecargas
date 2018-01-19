import { Injectable } from '@angular/core';
import {Promocion} from '../interfaces/promocion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class PromocionService {

  urlServer = 'http://localhost:1337/Promocion';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newPromocion(Clii: Promocion) {
    const cuerpo = JSON.stringify(Clii);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editPromocion(Clii: Promocion, id: string) {
    const cuerpo = JSON.stringify(Clii);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo );

  }

  getPromocion(id: string) {
    return this._http.get<Promocion>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllPromocion() {
    return this._http.get <Promocion>(this.urlServer) ;
  }
  deletePromocion(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );
  }

}
