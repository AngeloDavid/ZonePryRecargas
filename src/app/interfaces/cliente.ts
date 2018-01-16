export interface Cliente {
  cedula:string;
  nombre:string;
  apellido:string;
  edad:number;
  fecha_nacimiento:any;
  telefono:string;
  email:string;
  direccion:string;
  FanPageId?:number;
  estado:boolean;
  tarjetas:{
  	saldo:number;
  	fecha_vencimiento:any;
  	fecha_Activacion:any;
  	fecha_UltimoMovimiento?:any;
  	tipo:string;
  	islimitado:boolean;
  	estado:boolean;
  }
}
 