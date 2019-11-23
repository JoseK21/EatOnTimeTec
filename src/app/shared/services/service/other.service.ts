import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'app/config/urls';
import { cors } from 'app/config/cors';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  /* --------------------------------- Login & Register --------------------------------- */

  login(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + '/login', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  register(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + '/person/signup', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  /*---------------------------------  User    ---------------------------------*/

  get_menu(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + '/menu/get', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }


  get_person_details(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + '/person/details/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }


  create_order(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'order/place', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  find_friend_name(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'friend/find/name', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  find_friend_phone(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'friend/find/phone', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  add_friend(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'friend/add', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  delete_friend(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'friend/delete', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }



  /*---------------------------------  Admin Menu    ---------------------------------*/

  post_menu_dish_all(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'menu/add/dish/all', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  post_dish_add(data: any):any {
    console.log(data);
    this.http
      .post<any>(urls.api + 'dish/add', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(typeof error.status);
        if (error.status == 200) {
          return true
        } else {
          return false
        }        
      });
  }

  get_menu_dish_all() : any {
    this.http
      .get<any>(urls.api + 'menu/dish/all', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        let array = resp;
        return array;
      }, error => {
        console.log(error);
        return false;
      });
  }

  get_dish_id(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'dish/get/id', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  /*---------------------------------  POST    ---------------------------------*/
  assign_preferences_user(user_id: any) {
    console.log(user_id);
    this.http
      .post<any>(urls.api + 'assign/preferences/' + user_id, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  assign_roles_user(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'admin/assign/roles', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  add_preferences(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'admin/add/preferences', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }


  update_status_dish(data: any) {
    console.log(data);
    this.http
      .post<any>(urls.api + 'cook/update/status/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  /*---------------------------------  GET    ---------------------------------*/
  get_provinces():any {
    this.http
      .get<any>(urls.api + 'person/provinces', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_preferences_user(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'person/preferences/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_roles(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'admin/roles', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_recommendations(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'menu/get/recommendations/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_preferences(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'person/default/preferences', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_friends(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'friend/get/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

  get_orders_cook(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'cook/orders/' + data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }



  /* No Se Utiliza */
  get_menu_current(data: any) {
    console.log(data);
    this.http
      .get<any>(urls.api + 'menu/id/current', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);
        return resp
      }, error => {
        console.log(error);
        return false
      });
  }

}
