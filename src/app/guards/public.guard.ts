import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const localUser: any = localStorage.getItem('user');
    const user = JSON.parse(localUser);

    if (!user) {
      return true;
    }

    if (user?.role === 'IS_ADMIN') {
      this.router.navigate(['/admin/dashboard'], { queryParams: { returnUrl: state.url } }).then();
    }

    if (user?.role === 'CUSTOMER') {
      this.router.navigate(['/public/public-dashboard'], { queryParams: { returnUrl: state.url } }).then();
    }


    return false;
  }


}
