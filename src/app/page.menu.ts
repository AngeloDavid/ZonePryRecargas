/**
 * Created by angel on 12/01/2018.
 */
import { NbMenuItem } from '@nebular/theme';

export const menu: NbMenuItem [] = [
  {
    title: 'Escritorio',
    icon: 'fa fa-home' ,
    link: 'home',
    home: true,
  },
  {
    title: 'Recarga',
    icon: 'fa fa-pencil-square-o' ,
    children: [
      {
        title: 'Nueva Recarga',
        link: 'recarga/nuevo'
      },
      {
        title: 'Últimas Recargas',
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
        link: 'maquina/Lista'
      }
    ]
  },

  {
    title: 'Promociones',
    icon: 'fa fa-percent' ,
    children: [
      {
        title: 'Nueva Promocion',
        link: 'promociones/nuevo'
      },
      {
        title: 'Lista de Promociones',
        link: 'promociones/Lista'
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
        link: 'cliente/Lista'
      }
    ]
  }];
