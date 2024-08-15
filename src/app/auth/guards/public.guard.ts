import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router,} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})


export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }




  private ChecAuthStatus = (): boolean | Observable<boolean> =>{
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticate => {
        if (isAuthenticate) {
          this.router.navigate(['./heroes'])
        }
      }),
      map(isAuthenticate => !isAuthenticate)
    )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.ChecAuthStatus();

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.ChecAuthStatus();
  }






}
