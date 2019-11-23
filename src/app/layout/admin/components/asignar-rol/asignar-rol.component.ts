import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss']
})
export class AsignarRolComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  data: Date = new Date();
  focus;
  focus1;

  user_found = "";

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.get_roles();
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required]
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
            text: 'Nombre/Télefono no encontrado',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire(
            'Usuario encontrado',
            '',
            'success'
          );
          this.user_found = response_api.name;
        }
      }, error => {
        alert('error');
      });
  }

  roles: Array<String> = [];
  get_roles() {
    console.log('get_roles()');
    this.roles = [];
    this.http
      .get<any>(urls.api + 'admin/roles', cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.lenght == 0) {
          this.roles = [];
          console.log("Error al cargar las roles");
        }
        else {
          this.roles = response_api;
        }
      });
  }


}
