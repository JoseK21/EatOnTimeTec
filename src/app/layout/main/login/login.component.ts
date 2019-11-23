import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../config/urls';
import { cors } from '../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  data: Date = new Date();
  focus;
  focus1;

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("Form Invalid");
      return;
    }

    let data = this.loginForm.value;
    console.log(data);

    this.ingresar(data,"Inicio de sesión exitoso")

    /* this.http
      .post<any>(urls.api + 'login', data, cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);
        this.ingresar(data,"Inicio de sesión exitoso")
       
      }, error => {
        console.log(error.error.text);
        this.ingresar(data,error.error.text)
      }); */
  }

  ingresar(data,string){
    let string_api = string;
    if (string_api.length == 0) {
      Swal.fire({
        title: 'Error',
        text: "Id / Contraseña invalido",
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
    } else {

      /* Estudiante : 0
         Funcionario : 1
         Admin : 2
         Chef : 3
         AdminMenu 4
      */
      if (data.user_id == 116920112 || data.user_id ==2016653534) {
        this.onLoggedin("E", data.user_id);
        this.router.navigateByUrl('/usuario');
      }
      else if (data.user_id == 2016928920) {
        this.onLoggedin("E", data.user_id);
        localStorage.setItem('F', 'true');
        this.router.navigateByUrl('/usuario');
      }
      else if (data.user_id == 2016115728) {
        this.onLoggedin("A", data.user_id);
        this.router.navigateByUrl('/admin');
      }
      else if (data.user_id == 2016632434) {
        this.onLoggedin("C", data.user_id);
        this.router.navigateByUrl('/chef');
      }
      else if (data.user_id == 334342343 || data.user_id == 515111215) {      
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
  
        swalWithBootstrapButtons.fire({
          title: 'Seleccione el rol para ingresar',
          showCancelButton: true,
          confirmButtonText: 'Estudiante',
          cancelButtonText: 'Admin. Menu',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.onLoggedin("E", data.user_id);
            this.router.navigateByUrl('/usuario');
          } else {
            this.onLoggedin("AM", data.user_id);
            this.router.navigateByUrl('/admin_menu');
          }
        });
      }
      else{
        Swal.fire({
          title: 'Error',
          text: "Credenciales Invalidos",
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
      }}
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  onLoggedin(rol, user_id) {
    localStorage.clear();
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('is-' + rol, 'true');
    localStorage.setItem('user_id', user_id);
  }


  sitio_web = "https://www.x_tec.com";
  num_central = "2550-5858";
  correo = "x_tec@gmail.com";
  openInfoContacto() {
    Swal.fire({
      title: 'Información del Contacto',
      html: "Sitio Web : <a target='_blank' style='outline: none;' href= '" + this.sitio_web + "'>" + this.sitio_web + "</a>" +
        "<br/>Número de la central : <a style='outline: none;' href = 'tel:" + this.num_central + "'> " + this.num_central + "</a>"
        + "<br/>Correo Electronico : <a style='outline: none;' target='_blank' href = 'mailto: " + this.correo + "'>" + this.correo + "</a>",
      showCancelButton: false,
      showConfirmButton: false,
    })
  }
}

