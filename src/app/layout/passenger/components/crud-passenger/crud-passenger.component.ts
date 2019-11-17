import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-passenger',
  templateUrl: './crud-passenger.component.html',
  styleUrls: ['./crud-passenger.component.scss']
})
export class CrudPassengerComponent implements OnInit {

  updateForm: FormGroup;
  /*   deleteForm: FormGroup;
   */
  submitted_u = false;
  /*   submitted_d = false;
   */
  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get u() { return this.updateForm.controls; }
  /*   get d() { return this.deleteForm.controls; }
   */
  ngOnInit() {
    this.getNationalities();

    this.get_infoUser();

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      date_birth: ['', Validators.required],
      nationality: ['', Validators.required],
      residence: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
    /* this.deleteForm = this.formBuilder.group({
      id: ['', Validators.required]
    }); */

  }


  onSubmit_Update() {
    this.submitted_u = true;
    if (this.updateForm.invalid) {
      let f_ = JSON.stringify(this.updateForm.value);
      return;
    }
    let data = this.updateForm.value;
    this.http
      .put<any>(urls.api + 'updatePassenger/' + localStorage.getItem('id_user'), data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Account updated',
            text: "Your account was updated",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.submitted_u = false;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }

  onSubmit_Delete() {
    let id_user = localStorage.getItem('id_user');
    console.log('id_user : ' + id_user);
    console.log('deleteUser()');
    this.http
      .delete<any>(urls.api + 'deleteUser/' + id_user, cors.httpOptions)
      .subscribe(data => {
        if (data.message) {
          Swal.fire({
            title: 'Delete the account',
            text: data.message,
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Account',
            text: data.jsonResponse.m_delete,
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          localStorage.clear();
          this.router.navigateByUrl('/main');
        }

      });
  }

  get_infoUser() {
    let id_user = localStorage.getItem('id_user');
    this.http
      .get<any>(urls.api + 'readPassenger/' + id_user, cors.httpOptions)
      .subscribe(data => {

        if (!data.message) {
          this.getResidences(data.jsonResponse.nationality);
          this.updateForm.get('name').setValue(data.jsonResponse.name);
          this.updateForm.get('date_birth').setValue(data.jsonResponse.date_birth);
          this.updateForm.get('phone').setValue(data.jsonResponse.phone);
          this.updateForm.get('nationality').setValue(data.jsonResponse.nationality);
          this.updateForm.get('residence').setValue(data.jsonResponse.residence);
          this.updateForm.get('email').setValue(data.jsonResponse.email);
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }

  forms_Reset() {
    this.submitted_u = false;
    this.updateForm.reset();
    this.get_infoUser();
  }


  /* Obtiene las nacionalidades */
  nationalities = [];
  getNationalities() {
    console.log('getNationalities()');
    this.http
      .get<any>(urls.api + 'getNationalities', cors.httpOptions)
      .subscribe(data => {
        /* Falta condición de error */
        let jsonNationalities = JSON.parse(JSON.stringify(data.resp));
        for (let index = 0; index < jsonNationalities.length; index++) {
          let tem = JSON.parse(JSON.stringify(jsonNationalities[index]));
          this.nationalities.push(tem.nationality);
        }
      });
    console.log(this.nationalities);
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
