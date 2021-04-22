import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authorize/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivateChild {

  constructor(private authService: AuthService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>  {
    if(!this.authService.isAuthorized) {
      return true;
    }
    return false;
  }
  
  
}
