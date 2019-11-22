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
       
      }, error => {
        console.log(error.error.text);
      });
  }


}
