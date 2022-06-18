import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccauntService } from '../services/accaunt.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuhtGuardService implements CanActivate {

  constructor(private accaunt: AccauntService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.accaunt.isAuthentication()) {
        this.router.navigate(["page-not-found"]);
      }
      return true;
  }
}
