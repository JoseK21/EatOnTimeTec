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
      id_user: ['', Validators.required],
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
          this.onLoggedin(data.jsonResponse);
          this.router.navigateByUrl('/'+data.jsonResponse.rol);
        }
      }, error => {
        alert('error');
      });
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  onLoggedin(user) {
    localStorage.clear();
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('is-' + user.rol, 'true');
    localStorage.setItem('id_user', user.id_user);
  }
}

