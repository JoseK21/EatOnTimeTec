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

  amigos_list = [
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
    this.loginForm = this.formBuilder.group({
      amigo: ['', Validators.required],
    });
  }

  removerAmigo(amigo_name){
    console.log(amigo_name);
    
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

    /* this.http
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
          this.onLoggedin(data.jsonResponse);
          this.router.navigateByUrl('/' + data.jsonResponse.rol);
        }
      }, error => {
        alert('error');
      });
  */
  }

}
