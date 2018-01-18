export interface Maquina {
  description: string;
  tarifa: number;
  intentos?: number;
  tipo: string;
  estado: boolean;
}
