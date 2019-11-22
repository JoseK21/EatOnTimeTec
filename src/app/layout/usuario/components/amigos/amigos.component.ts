import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  amigos_list_A = [
    { name: "José Núñez" },
    { name: "Marcelo Sanchez" },
    { name: "Daniel Montoya" },
    { name: "José Núñez" },
    { name: "Marcelo Sanchez" },
    { name: "Daniel Montoya" },
    { name: "José Núñez" },
    { name: "Marcelo Sanchez" },
    { name: "Daniel Montoya" },
    { name: "José Núñez" },
    { name: "Marcelo Sanchez" },
    { name: "Daniel Montoya" },
    { name: "José Núñez" },
    { name: "Marcelo Sanchez" },
    { name: "Daniel Montoya" },
    { name: "Sebastian Mora" }

  ]
  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.get_user_friends();
    this.loginForm = this.formBuilder.group({
      amigo: ['', Validators.required],
    });
  }

  removerAmigo(amigo_id) {

    let data = { "idUser": localStorage.getItem('idUser'), "idFriend": amigo_id };
    console.log(amigo_id);
    this.http
      .post<any>(urls.api + '/friend/delete', data, cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.message) {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podigo eliminar este amigo, Intenlo mas tarde',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Exito',
            text: 'Amigo eliminado correctamente',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        }
      }, error => {
        alert('error');
      });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      console.log("Form Invalid");
      return;
    }

    this.submitted = false;
    let data = this.loginForm.value;
    console.log(data);

    this.http
      .post<any>(urls.api + 'login', data, cors.httpOptions)
      .subscribe(data => {

        if (data.message) {
          Swal.fire({
            title: 'Error',
            text: data.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {

        }
      }, error => {
        alert('error');
      });

  }


  amigos_list: Array<String> = [];
  get_user_friends() {
    console.log('get_user_friends()');
    this.amigos_list = [];
    this.http
      .get<any>(urls.api + 'friend/get/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.lenght == 0) {
          this.amigos_list = [];
          console.log("Error al cargar las amigos_list");
        }
        else {
          this.amigos_list = response_api;
        }
      });
  }

}
