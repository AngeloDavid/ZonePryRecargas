import  {Promocion} from  './promocion';
export interface Horario {
  id?: number;
  dia: string;
  hora_inicio: any;
  hora_final: any;
  estado: boolean;
  promociones?: Promocion [];
}
