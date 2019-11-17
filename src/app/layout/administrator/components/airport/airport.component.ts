import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss']
})
export class AirportComponent implements OnInit {
  createForm: FormGroup;
  readForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  submitted_c = false;
  submitted_r = false;
  submitted_u = false;
  submitted_d = false;

  json_response = false;  /* Show table Airport: true-false */

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get c() { return this.createForm.controls; }
  get r() { return this.readForm.controls; }
  get u() { return this.updateForm.controls; }
  get d() { return this.deleteForm.controls; }

  ngOnInit() {
    this.getLocation();
    this.getIdsAirport();

    this.createForm = this.formBuilder.group({
      id_airport: ['', Validators.required],
      name: ['', Validators.required],
      country: ['', Validators.required],
      info_contact: ['', Validators.required],
      url_website: ['', Validators.required]
    });
    this.readForm = this.formBuilder.group({
      id_airport: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      id_airport: ['', Validators.required],
      name: ['', Validators.required],
      country: ['', Validators.required],
      info_contact: ['', Validators.required],
      url_website: ['', Validators.required]
    });
    this.deleteForm = this.formBuilder.group({
      id_airport: ['', Validators.required]
    });
  }


  onSubmit_Create() {
    this.submitted_c = true;
    if (this.createForm.invalid) {
      return;
    }
    let data = this.createForm.value;
    this.http
      .post<any>(urls.api + 'createAirport', data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Airport created',
            text: "The airport was created",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.submitted_c = false;
          this.createForm.reset();
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }

  airport_read = {};
  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }
    let data = this.readForm.value;
    console.log(data);
    this.http
      .get<any>(urls.api + 'readAirport/' + data.id_airport, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.airport_read = data.jsonResponse;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }


  airport_update = {};
  onchangeUpdate(id_airport) {
    this.http
      .get<any>(urls.api + 'readAirport/' + id_airport, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          console.log('onchangeUpdate');
          this.updateForm.get('name').setValue(data.jsonResponse.name);
          this.updateForm.get('country').setValue(data.jsonResponse.country);
          this.updateForm.get('info_contact').setValue(data.jsonResponse.info_contact);
          this.updateForm.get('url_website').setValue(data.jsonResponse.url_website);
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }


  onSubmit_Update() {
    this.submitted_u = true;
    if (this.updateForm.invalid) {
      let f_ = JSON.stringify(this.updateForm.value);
      return;
    }
    let data = this.updateForm.value;
    this.http
      .put<any>(urls.api + 'updateAirport/' + data.id_airport, data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Airport updates',
            text: "The airport was updated",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.submitted_u = false;
          this.updateForm.reset();
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
    this.submitted_d = true;
    if (this.deleteForm.invalid) {
      return;
    }

    let data = this.deleteForm.value;
    this.http
      .delete<any>(urls.api + 'deleteAirport/' + data.id_airport, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Airport deleted',
            text: "The airport was deleted",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.getIdsAirport();
          this.submitted_d = false;
          this.deleteForm.reset();
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

    this.getIdsAirport();
    this.json_response = false;

    this.submitted_c = false;
    this.createForm.reset();

    this.submitted_r = false;
    this.readForm.reset();

    this.submitted_u = false;
    this.updateForm.reset();

    this.submitted_d = false;
    this.deleteForm.reset();
  }

  openURL(url){
    try {
      window.open(url);
    } catch (error) {
      console.log('Enable only on windows');
      
    }
    
  }



  countries = [];
  getLocation() {
    this.http
      .get<any>(urls.api + 'getCountries', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.countries = JSON.parse(JSON.stringify(data.jsonResponse)).country;
        } else {
          console.log("Error al cargar los paises");
        }
      });
  }

  id_airport = [];
  getIdsAirport() {
    console.log('getIdsAirport()');
    this.id_airport = [];
    this.http
      .get<any>(urls.api + 'getIdsAirports', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonIdsAirport = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonIdsAirport.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonIdsAirport[index]));
            this.id_airport.push(tem.id_airport);
          }
        } else {
          console.log("Error al cargar los ids airport");
        }
      });
  }



  deleteAirport() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'The airport was deleted!',
          'success'
        )
      }
    })
  }


}
