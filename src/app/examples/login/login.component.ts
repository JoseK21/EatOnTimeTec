import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urls } from '../../config/urls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    Form: FormGroup;
    submitted = false;

    data : Date = new Date();
    focus;
    focus1;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    };

    ngOnInit() {
        this.Form = this.formBuilder.group({
            id: ['', Validators.required],
            password: ['', Validators.required]
        });

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.Form.invalid) {
            console.log("registerForm.invalid");
            return;
        }

        let data = this.Form.value;
        /* data.rol = 2; */

        console.log(JSON.stringify(data, null, 4));

       /*  this.http
            .post<any>(urls.localhost + '/Login', data, this.httpOptions)
            .subscribe(data => {
                Swal.fire({   
                    title: 'Account created',
                    text: "Your account was created",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    this.router.navigateByUrl('/login');
                })
            }); */
          
    }

    onReset() {
        this.submitted = false;
        this.Form.reset();
    }

}
