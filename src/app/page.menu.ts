/**
 * Created by angel on 12/01/2018.
 */
import { NbMenuItem } from '@nebular/theme';

export const menu: NbMenuItem [] = [
  // {
  //   title: 'Escritorio',
  //   icon: 'fa fa-home' ,
  //   link: 'home',
  //   home: true,
  // },
  {
    title: 'Consumo',
    icon: 'fa fa-pencil-square-o' ,
    children: [
      {
        title: 'Nueva Consumo',
        link: 'recarga/nuevo'
      },
      {
        title: 'Últimas Consumos',
        link: 'recarga/Lista'
      }
    ]
  },
  {
    title: 'Maquinas',
    icon: 'fa fa-steam-square' ,
    children: [
      {
        title: 'Nueva Máquina',
        link: 'maquina/nuevo'
      },
      {
        title: 'Lista de máquinas',
        link: 'maquinas'
      }
    ]
  },

  {
    title: 'Promociones',
    icon: 'fa fa-percent' ,
    children: [
      {
        title: 'Nueva Promocion',
        link: 'promocion/nuevo'
      },
      {
        title: 'Lista de Promociones',
        link: 'promociones'
      },
      {
        title: 'Horarios',
        link: 'Horarios'
      }
    ]
  },

  {
    title: 'Reportes',
    icon: 'fa fa-line-chart' ,
    children: [
      {
        title: 'Mensual',
      }
    ]
  },
  {
    title: 'Clientes',
    icon: 'fa fa-users' ,
    children: [
      {
        title: 'Nuevo Cliente',
        link: 'cliente/nuevo'
      },
      {
        title: 'Lista de Clientes',
        link: 'clientes'
      }
    ],
  },
  {
    title: 'Tarjetas Virtuales',
    icon: 'fa fa-credit-card' ,
    children: [
      {
        title: 'NuevoTarjeta',
        link: 'tarjeta/nuevo'
      },
      {
        title: 'Lista de Tarjetas',
        link: 'tarjetas'
      }
    ],
  }];
