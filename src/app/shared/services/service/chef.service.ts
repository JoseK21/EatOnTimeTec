import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'app/config/urls';
import { cors } from 'app/config/cors';


@Injectable({
  providedIn: 'root'
})
export class ChefService {

  constructor(private http: HttpClient) { }

  post(data: any) {
    this.http
      .post<any>(urls.api + '/register', data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }

  get(data: any) {
    this.http
      .get<any>(urls.api + '/register', cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }


}
