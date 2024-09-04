import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Service/user/user.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.userService.isLoggedIn();

  if (isLoggedIn && state.url === '/user-login') {
    // Redirect to home if already logged in and trying to access login page
    return this.router.parseUrl('/user-home');
  } else if (!isLoggedIn && state.url !== '/user-login') {
    // Redirect to login if not logged in and trying to access a protected route
    return this.router.parseUrl('/user-login');
  }

  return true;
  }
}
