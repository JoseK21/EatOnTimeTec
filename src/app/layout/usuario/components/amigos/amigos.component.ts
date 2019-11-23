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

    let data = { "idUser": localStorage.getItem('used_id'), "idFriend": amigo_id };
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

    let data_to_send = {};

    let buscar_por = "";
    if (data.length == 9) {
      data_to_send = { "phone": data.name }
      buscar_por = 'phone';
    } else {
      buscar_por = 'name';
      data_to_send = { "name": data.name } /* Esta en html : name */
    }

    this.http
      .post<any>(urls.api + 'friend/find/' + buscar_por, data_to_send, cors.httpOptions)
      .subscribe(response_api => {

        if (response_api.lenght == 0) {
          Swal.fire({
            title: 'Error',
            text: 'Nombre/Tèlefono no encontrado',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          /* Swal.fire(
            'Amigo encontrado',
            response_api.name + ' es un nuevo amigo',
            'success'
          ); */
          this.add_friend(response_api.idUser)
        }
      }, error => {
        alert('error');
      });
  }

  add_friend(idFriend) {
    let data_to_send = { idUser: localStorage.getItem('used_id'), idFriend: idFriend };
    this.http
      .post<any>(urls.api + 'friend/add', data_to_send, cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.lenght == 0) {
          Swal.fire({
            title: 'Error',
            text: 'Amigo no exadido a la lista de amigos',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire(
            'Amigo guardado',
            'Registro de nuevo amigo correcto',
            'success'
          );
          this.get_user_friends();
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
