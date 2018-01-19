import {Horario} from './horario';
export interface Promocion {
  id?: string;
  titulo: string;
  decripcion: string;
  cantidad: number;
  operacion: string;
  fecha_vencimiento?: any;
  fecha_Activacion?: any;
  islimitado?: boolean;
  estado: boolean;
  aplica_a: string;
  consumos?: any;
  recargas?: any;
  horarioFk?: Horario;
}
