import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginI } from '../models/login';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';

import { urls } from "../../config/urls";
import { cors } from "../../config/cors";

const apiURL = urls.api;
const corsHTTP = cors.httpOptions.headers;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private token: string;
  constructor(private http: HttpClient) { }

  /* login(user: LoginI): Observable<JwtResponseI> {
    console.log('antes del post');
    return this.http.post<JwtResponseI>(`${apiURL}login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn); // guardar token
          }
        })
      );
  }

  register(user: UserI): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(`${apiURL}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {            
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn); // guardar token
          }
        })
      ); */

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  login_(jsonData) {
    const path = urls.api + 'login';
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", this.httpOptions);
  }

  getUniversities() {
    const path = urls.api + 'universities';
    return this.http.get(path);
  }

  login(data: any) {
    this.http
      .post<any>(urls.api + '/login', data, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        const user = data[0];
        if (user) {
        } else {
          alert('Error Register 1');
        }
      }, error => {
        alert('Error Register 2');
      });
  }

  register(data: any) {
    this.http
      .post<any>(urls.api + '/register', data, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        const user = data[0];
        if (user) {
        } else {
          alert('Error Register 1');
        }
      }, error => {
        alert('Error Register 2');
      });
  }



  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

}
