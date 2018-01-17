import {Tarjetas} from './tarjetas';
export interface Cliente {
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
