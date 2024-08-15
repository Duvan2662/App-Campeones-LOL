import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/pages/page404/page404.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[PublicGuard],
    canMatch:[PublicGuard]
  },

  {
    path: 'heroes',
    loadChildren:() => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate:[AuthGuard],
    canMatch:[AuthGuard]
  },

  {
    path: '404',
    component: Page404Component
  },

  {
    path: '',
    redirectTo:'heroes',
    pathMatch:'full'
  },

  {
    path: '**',
    redirectTo:'404',
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
