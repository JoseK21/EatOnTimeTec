import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin-menu',
  templateUrl: './navbar-admin-menu.component.html',
  styleUrls: ['./navbar-admin-menu.component.scss']
})
export class NavbarAdminMenuComponent implements OnInit {

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  public gotoProductDetailsV2() {

    this.router.navigateByUrl('admin_menu/new_dish').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
