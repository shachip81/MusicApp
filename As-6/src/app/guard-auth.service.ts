import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(private a: AuthService, private router: Router ) { }

  canActivate(): boolean{
    if(this.a.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
