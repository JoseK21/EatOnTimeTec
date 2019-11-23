import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';
import { ServiceService } from 'app/shared/services/service.service';
import { OtherService } from 'app/shared/services/service/other.service';

@Component({
  selector: 'app-config-menu',
  templateUrl: './config-menu.component.html',
  styleUrls: ['./config-menu.component.scss']
})
export class ConfigMenuComponent implements OnInit {


  menu_list: any = [];

  constructor(public router: Router, private service: ServiceService, private call: OtherService, private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<any>(urls.api + 'menu/dish/all', cors.httpOptions)
      .subscribe(resp => {
        this.menu_list = resp;
      }, error => {
        this.menu_list = [];
      });

  //  this.menu_list = this.call.get_menu_dish_all();

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
    console.log("Remove " + name);

  }
  edit(name) {
    console.log("Edit " + name);
  }

}
