import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../config/urls';
import { cors } from '../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  data: Date = new Date();
  focus;
  focus1;

  provincias__ = ["0","1","2","3","4","5"];

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  fake_datas_random = 2020202020;
  ngOnInit() {

    this.get_preferences();
    this.getProvince();

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      provinceName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')]],
      /* rol: "Estudiante", */
      id_user: this.fake_datas_random,
      name: 'Juan Pablo Esquivel Moya',
      password: String(this.fake_datas_random)
    });
  }

  getRandomInt() {
    let min = Math.ceil(2000000000);
    let max = Math.floor(2019000000);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.submitted = true;
      console.log("registerForm.invalid");
      return;
    }

    this.submitted = false;

    this.fake_datas_random = this.getRandomInt() ;

    Swal.fire({
      title: 'Facebook!',
      text: 'Cuenta : ' + String(this.fake_datas_random) ,
      imageUrl: 'assets/facebook.png',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })


    let data = this.signUpForm.value;
    console.log(data);
    
    this.http
      .post<any>(urls.api + 'person/signup', data, cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Carné registrado",
          })
        } else {
          Swal.fire({
            title: 'Cuenta creada',
            text: "Su cuenta fue creada con exito",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.onLoggedin("E", data.user_id);
            this.router.navigateByUrl('/usuario');
          })
        }
      });
  }

  onLoggedin(rol, user_id) {
    localStorage.clear();
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('is-' + rol, 'true');
    localStorage.setItem('user_id', user_id);
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
        if (response_api.lenght == 0) {
          this.provincias = [];
          console.log("Error al cargar las provincias");
        } 
        else {
          this.provincias = response_api;
          /* for (let index = 0; index < response_api.length; index++) {
            let tem = JSON.parse(JSON.stringify(response_api[index]));
            this.provincias.push(tem.provinceName);
          } */
        }
      });
  }


  preferencias: Array<String> = [];
  get_preferences() {
    console.log('get_preferences()');
    this.preferencias = [];
    this.http
      .get<any>(urls.api + 'default/preferences', cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.length == 0) {
          this.preferencias = [];
          console.log("Error al cargar las preferencias/gustos");
        } else {
          this.preferencias = response_api;
        }
      });
  }

  my_preference = [];
  add_preference(preference){
    this.my_preference.push(preference.preference);
  }
}

