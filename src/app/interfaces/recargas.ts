import {Tarjetas} from  './Tarjetas';
import {Promocion} from  './Promocion';
export interface Recargas {
  id?: string,
  abono: number;
  total?: number;
  saldo?: number;
  credito?: number;
  observaciones?: string;
  tarjetaFk?: Tarjetas;
  promocionFk?: Promocion;
  createdAt?:any;
}
