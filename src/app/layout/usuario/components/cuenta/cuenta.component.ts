import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';
import { ServiceService } from 'app/shared/services/service.service';

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


  constructor(private service: ServiceService, private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.get_preferences();
    this.getProvince();
    this.get_info();

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      provinceName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')]],
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

    /*     data.id_user = "";
        data.name = "";
        data.password = ""; */

    this.http
      .post<any>(urls.api + 'URL' + localStorage.getItem('user_id'), data, cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Información no actualizada, intentelo de nuevo.',
          })
        } else {
          Swal.fire({
            type: 'success',
            title: 'Actualización',
            text: 'Información actualizada exitosamente.',
          })
        }
      });
  }



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


  my_preferences = [];
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
          this.service.set_preference(this.my_preferences);

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

          let misGUSTOS = this.service.get_preference();
          this.preferencias.forEach(element => {
            console.log('element[name]: ' + element['preference']);

            if (misGUSTOS.find((s) => s === element['preference'])) {
              this.preferencias[i]['checked'] = true;
            } else {
              this.preferencias[i]['checked'] = false;
            }
          })
          i++;
        }
      })
  }
}

