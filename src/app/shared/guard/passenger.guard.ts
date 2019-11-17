import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class PassengerGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('isLoggedin') && localStorage.getItem('is-passenger') ) {
            return true;
        }
        this.router.navigate(['/main']);
        return false;
    }
}
