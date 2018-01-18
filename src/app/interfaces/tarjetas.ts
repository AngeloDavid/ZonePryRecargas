import {Cliente} from './cliente';


export interface Tarjetas {
  id?: number,
  description: string;
  creditos:number;
  saldo: number;
  fecha_vencimiento?: any;
  fecha_Activacion: any;
  fecha_UltimoMovimiento?: any;
  tipo: string;
  islimitado?: boolean;
  estado: boolean;
  userFk?: Cliente;
  consumos?: any [];
  recargas?: any [];
}
