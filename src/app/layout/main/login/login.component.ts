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


     this.http
      .post<any>(urls.api + 'login', data, cors.httpOptions)
      .subscribe(response_api => {

        console.log(response_api);
        
        if (response_api.message) {
          Swal.fire({
            title: 'Error',
            text: response_api.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {

          /* this.onLoggedin(response_api.jsonResponse);
          this.router.navigateByUrl('/' + response_api.jsonResponse.rol); */
        }
      }, error => {
        alert('error');
      });
 



    if (data.user_id == "E") {
      this.router.navigateByUrl('/usuario');
    }
    else if (data.user_id == "F") {
      this.router.navigateByUrl('/usuario');
    }
    else if (data.user_id == "A") {
      this.router.navigateByUrl('/admistrator');
    }
    else if (data.user_id == "AM") {

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
        confirmButtonText: 'Cliente',
        cancelButtonText: 'Admin. Menu',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/usuario');
        } else {
          this.router.navigateByUrl('/admin_menu');
        }
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        text: "Id / Contraseña invalido",
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
    }

   
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  onLoggedin(user) {
    localStorage.clear();
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('is-' + user.rol, 'true');
    localStorage.setItem('user_id', user.user_id);
  }


  sitio_web = "www.x_tec.com";
  num_central = "2550-5858";
  correo = "x_tec@gmail.com";
  openInfoContacto() {
    Swal.fire({
      title: 'Información del Contacto',
      html: "Sitio Web : <a target='_blank' style='outline: none;' href= '" + this.sitio_web + "'>" + this.sitio_web + "</a>"+
        "<br/>Número de la central : <a style='outline: none;' href = 'tel:" + this.num_central + "'> " + this.num_central + "</a>"
        +"<br/>Correo Electronico : <a style='outline: none;' target='_blank' href = 'mailto: " + this.correo + "'>" + this.correo + "</a>",
      showCancelButton: false,
      showConfirmButton: false,
    })
  }
}

