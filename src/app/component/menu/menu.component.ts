import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import {menu} from '../../page.menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public _menund= menu;
  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  goToHome() {
   // this.menuService.navigateHome();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

}


