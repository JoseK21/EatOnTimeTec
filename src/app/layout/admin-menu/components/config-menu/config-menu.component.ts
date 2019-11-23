import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-menu',
  templateUrl: './config-menu.component.html',
  styleUrls: ['./config-menu.component.scss']
})
export class ConfigMenuComponent implements OnInit {


  menu_list = [
    {
      name: "Patacones",
      shortname: "Patacones"
    },
    {
      name: "Frijoles Blancos",
      shortname: "FrijolesBlancos"
    }
  ];

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


  remove(name) {
    console.log("Remove "+name);

  }
  edit(name) {
    console.log("Edit "+name);
  }

}
