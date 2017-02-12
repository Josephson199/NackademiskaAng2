import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './accounts/shared/auth.service';
import { Router } from '@angular/router'

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
      if(!this.authService.isAdmin()){
            this.router.navigate(['admin/login'])
        }
        else{
            return true
        }
  }

  
}