import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {


  public sideBarItems = [
    {
      label: 'Listado',
      icon: 'list_alt',
      url: './list'
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero'
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search'
    }

  ]

  constructor(
    private authService:AuthService,
    private router: Router,
  ){ }


  public get user() : User| undefined {
    return this.authService.currentUser
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
