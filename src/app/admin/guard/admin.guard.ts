import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from 'src/app/shared/service/guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public guardservice:GuardService,
    public router:Router
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.guardservice.checkToken()){
        this.router.navigate(['/admin/adminDashboard'])
      }
      // if(!this.guardservice.checkToken()){
      //   this.router.navigate(['/auth/login'])
      //   return false
      // }
    return true;
  }
  
}
