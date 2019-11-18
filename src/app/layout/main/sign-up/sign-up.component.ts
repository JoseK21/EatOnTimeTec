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

  gustos = ["Pastas", "Vegeterariano", "Carnes", "Ensaladas"];
  

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.getNationalities();

    this.signUpForm = this.formBuilder.group({
      id_user: ['', Validators.required],
      rol: "passenger",
      name: ['', Validators.required],
      date_birth: ['', Validators.required],
      nationality: ['', Validators.required],
      residence: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      console.log("registerForm.invalid");
      return;
    }
    let data = this.signUpForm.value;
    this.http
      .post<any>(urls.api + 'register', data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Account created',
            text: "Your account was created",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigateByUrl('/' + data.jsonResponse.rol);
          })
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }
  
  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
  // Lista de numeros
  listPhone: Array<String> = [];

  addPhone() {
    Swal.fire({
      title: 'New Phone',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: (new_phone) => {
        this.listPhone.push(new_phone);
      }
    });
    console.log(this.listPhone);
  }


  /* getNationalities  */
  nationalities = [];
  getNationalities() {
    console.log('getNationalities()');
    this.http
      .get<any>(urls.api + 'getNationalities', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonNationalities = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonNationalities.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonNationalities[index]));
            this.nationalities.push(tem.nationality);
          }
        } else {
          console.log("Error al cargar las nacionalidades");
        }
      });
  }


  get_residence(nac) {
    this.getResidences(nac);
  }

  /* getResidences */
  residences = [];
  getResidences(nacionality: string) {
    console.log('getResidences()');
    this.http
      .get<any>(urls.api + 'getResidences/' + nacionality, cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResidences) {
          this.residences = JSON.parse(JSON.stringify(data.jsonResidences)).residence;
        } else {
          console.log("Error al cargar las residencias");
        }
      });
  }
}

