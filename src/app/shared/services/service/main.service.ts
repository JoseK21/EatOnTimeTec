import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'app/config/urls';
import { cors } from 'app/config/cors';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

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
}
