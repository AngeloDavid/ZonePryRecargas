export interface Maquina {
  id?: number;
  description: string;
  tarifa: number;
  intentos?: number;
  tipo: string;
  estado: boolean;
}
