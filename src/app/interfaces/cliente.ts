import {Tarjetas} from './tarjetas';
export interface Cliente {
  id?: number;
  cedula: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento?: any;
  telefono: string;
  email: string;
  direccion: string;
  FanPageId?: number;
  estado: boolean;
  tarjetas?: Tarjetas [];
}
