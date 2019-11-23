import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'app/config/urls';
import { cors } from 'app/config/cors';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  get_menu(data: any) {
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
    this.http
      .get<any>(urls.api + '/person/details/'+data, cors.httpOptions)
      .subscribe(resp => {
        console.log(resp);        
        return resp
      }, error => {
        console.log(error);        
        return false
      });
  }
  
}
