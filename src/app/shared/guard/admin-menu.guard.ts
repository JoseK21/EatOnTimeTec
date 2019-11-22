import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('is-AM')) {
      return true;
    }
    this.router.navigate(['/inicio_sesion']);
    return false;
  }
}
