import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'app/config/urls';
import { cors } from 'app/config/cors';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {

  constructor(private http: HttpClient) { }

  post_menu_dish_all(data: any) {
    this.http
      .post<any>(urls.api + '/menu/add/dish/all', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }

  post_dish_add(data: any) {
    this.http
      .post<any>(urls.api + '/dish/add', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }

  get_menu_dish_all(data: any) {
    this.http
      .get<any>(urls.api + '/menu/dish/all', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }

  get_dish_id(data: any) {
    this.http
      .get<any>(urls.api + '/dish/get/id', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }
  
}
