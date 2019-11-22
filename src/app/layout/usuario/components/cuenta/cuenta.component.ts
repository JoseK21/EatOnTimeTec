import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  data: Date = new Date();
  focus;
  focus1;

  gustos = ["Pastas", "Vegeterariano", "Carnes", "Ensaladas"];


  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.getProvince();
    this.get_info();
    this.get_preferences();

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      provinceName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')]],
      /* rol: "Estudiante", */
      /*      id_user: this.fake_datas_random,
           name: 'Juan Pablo Esquivel Moya',
           password: String(this.fake_datas_random) */
    });
  }

  get f() { return this.signUpForm.controls; }


  info_user = {};
  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      console.log("registerForm.invalid");
      return;
    }
    let data = this.signUpForm.value;

    data.id_user = "";
    data.name = "";
    data.password = "";

    this.http
      .get<any>(urls.api + 'actualizar cuentaaaaaa' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Información no cargada, recargue por favor.',
          })
        } else {
          this.info_user = response_api;

        }
      });
  }


  my_preferences = [];
  get_info() {
    this.http
      .get<any>(urls.api + 'person/details/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Información no cargada, recargue por favor.',
          })
        } else {
          this.info_user = response_api;
          this.signUpForm.get('email').setValue(response_api.email);
          this.signUpForm.get('provinceName').setValue(response_api.province.provinceName);
          this.signUpForm.get('phone').setValue(response_api.phone);
        }
      });
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }


  /* getProvince  */
  provincias: Array<String> = [];
  getProvince() {
    console.log('getProvince()');
    this.provincias = [];
    this.http
      .get<any>(urls.api + 'person/provinces', cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);
        if (response_api.lenght == 0) {
          this.provincias = [];
          console.log("Error al cargar las provincias");
        }
        else {
          this.provincias = response_api;
        }
      });
  }


  preferencias: Array<String> = [];
  check_preferencias = [];
  get_preferences() {
    this.http
      .get<any>(urls.api + '/person/preferences/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log('<<Mis Gustos>>');
        console.log(response_api);

        if (response_api.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Información no cargada, recargue por favor.',
          })
        } else {
          this.my_preferences = response_api;
          console.log(this.my_preferences);

        }
      });



    console.log('get_preferences()');
    this.preferencias = [];
    this.http
      .get<any>(urls.api + 'person/default/preferences', cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.length == 0) {
          this.preferencias = [];
          console.log("Error al cargar las preferencias/gustos");
        } else {
          this.preferencias = response_api;
          let i = 0;

          this.preferencias.forEach(element => {
            console.log('element[name]: '+element['preference']);
            console.log(this.my_preferences);
            
            this.my_preferences.forEach(pref => {
              console.log('pref: '+pref);


              if (pref == element['preference']) {
                this.preferencias[i]['checked'] = true;
              }
              else {
                this.preferencias[i]['checked'] = false;
              }
            });
          })
          i++;
        }
      })
  }
}

