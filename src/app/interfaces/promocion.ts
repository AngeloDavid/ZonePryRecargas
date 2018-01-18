export interface Promocion {
  titulo:string;
  decripcion:string;
  cantidad:number;
  operacion:string;
  fecha_vencimiento?:any;
  fecha_Activacion?:any;
  islimitado?:boolean;
  estado:boolean;
  consumos:any;
  recargas:any;
}
