import { Injectable } from '@angular/core';
import {Horario} from '../interfaces/horario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HorarioService {

  urlServer = 'http://192.168.0.26:1337/Horario';
  cabecera;
  constructor(private _http: HttpClient) {
    this.cabecera = new HttpHeaders().set('content-type', 'application/json');
    this.cabecera.set('Access-Control-Allow-Origin', '*');
    this.cabecera.set('Access-Control-Allow-Credentials', 'true');
    this.cabecera.set('Access-Control-Allow-Headers', 'Content-Type');
    this.cabecera.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  newHorario(Clii: Horario) {
    const cuerpo = JSON.stringify(Clii);
    return this._http.post(this.urlServer + '/', cuerpo , { headers: this.cabecera });
  }

  editHorario(Clii: Horario, id: string) {
    const cuerpo = JSON.stringify(Clii);
    console.log(cuerpo);
    return this._http.post(this.urlServer + '/' + id, cuerpo );

  }

  getHorario(id: string) {
    return this._http.get<Horario>(this.urlServer + '/' + id, { headers: this.cabecera });
  }

  getAllHora() {
    return this._http.get <Horario>(this.urlServer) ;
  }
  deleteHora(estado: boolean, id: string) {
    console.log(estado);
    const deletema = !estado;
    const datos = JSON.stringify({ "estado" :  deletema  });
    console.log(datos);
    return this._http.post(this.urlServer + '/' + id, datos );
  }
}
