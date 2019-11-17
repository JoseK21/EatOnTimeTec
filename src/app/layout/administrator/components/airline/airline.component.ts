import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss']
})
export class AirlineComponent implements OnInit {
  createForm: FormGroup;
  readForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  submitted_c = false;
  submitted_r = false;
  submitted_u = false;
  submitted_d = false;

  /*  array_Country = new Array(); */

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get c() { return this.createForm.controls; }
  get r() { return this.readForm.controls; }
  get u() { return this.updateForm.controls; }
  get d() { return this.deleteForm.controls; }

  ngOnInit() {
    this.getCountries();
    this.getNameAirports();
    this.getIdsAirline();

    this.createForm = this.formBuilder.group({
      id_airline: ['', Validators.required],
      name_airport: ['', Validators.required],
      name_airline: ['', Validators.required],
      /* country: [[], Validators.required] */
    });
    this.readForm = this.formBuilder.group({
      id_airline: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      id_airline: ['', Validators.required],
      name_airport: ['', Validators.required],
      name_airline: ['', Validators.required],
      /* country: ['', Validators.required] */
    });
    this.deleteForm = this.formBuilder.group({
      id_airline: ['', Validators.required]
    });
  }


  onSubmit_Create() {
    this.submitted_c = true;
    let data = this.createForm.value;
    data.country = this.array_Country;
    if (this.createForm.invalid) {
      return;
    }
    this.http
      .post<any>(urls.api + 'createAirline', data, cors.httpOptions)
      .subscribe(data => {
        if (data.message) {
          Swal.fire({
            title: 'ERROR',
            text: data.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your airline has been saved',
            showConfirmButton: false,
            timer: 2000
          });
          this.submitted_c = false;
          this.createForm.reset();
          this.getCountries();
        }
      }, error => {
        alert('error');
      });
  }

  array_Country: Array<string> = [];
  arrayCountry(country) {
    if (this.array_Country.includes(country)) {
      for (var i = 0; i < this.array_Country.length; i++) {
        if (this.array_Country[i] === country) {
          this.array_Country.splice(i, 1);
        }
      }
    } else {
      this.array_Country.push(country);
    }
  }

  json_response = false;  /* Show table Airline: true-false */
  airlines_read = {};
  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }
    let data = this.readForm.value;
    console.log(data);
    this.http
      .get<any>(urls.api + 'readAirline/' + data.id_airline, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.airlines_read = data.jsonResponse;
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
    data.country = this.array_Country;

    this.http
      .put<any>(urls.api + 'updateAirline/' + data.id_airline, data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Airline updates',
            text: "The airline was updated",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.countries.forEach(element => {
            document.getElementById(element+'__').removeAttribute("checked");            
          });
          this.countries = [];
          this.forms_Reset();
          this.getCountries();
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
      .delete<any>(urls.api + 'deleteAirline/' + data.id_airline, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Airline deleted',
            text: "The airline was deleted",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.getIdsAirline();
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
    this.getIdsAirline();
    this.json_response = false; /* show table */
    this.submitted_c = false;
    this.createForm.reset();
    this.array_Country = [];

    this.submitted_r = false;
    this.readForm.reset();

    this.submitted_u = false;
    this.updateForm.reset();

    this.submitted_d = false;
    this.deleteForm.reset();
  }


  names_airport = [];
  getNameAirports() {
    this.names_airport = [];
    this.http
      .get<any>(urls.api + 'getNameAirports', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonIdsAirport = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonIdsAirport.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonIdsAirport[index]));
            this.names_airport.push(tem.name);
          }
        } else {
          console.log("Error al cargar los ids airport");
        }
      });
  }

  countries = [];
  getCountries() {
    this.countries = [];
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

  id_airlines = [];
  getIdsAirline() {
    this.id_airlines = [];
    this.http
      .get<any>(urls.api + 'getIdsAirline', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonIdsAirport = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonIdsAirport.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonIdsAirport[index]));
            this.id_airlines.push(tem.id_airline);
          }
        } else {
          console.log("Error al cargar los ids airlines");
        }
      });
  }


  airline_update = {};
  onchangeUpdate(id_airline) {
    this.http
      .get<any>(urls.api + 'readAirline/' + id_airline, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          /* problema de reinicio de los checkbox, una vez manualmente se checked */
          this.array_Country = [];
          this.submitted_u = false;
          this.updateForm.reset();
          this.countries.forEach(element => {
            document.getElementById(element+'__').removeAttribute("checked");            
          });      
          
          this.updateForm.get('id_airline').setValue(data.jsonResponse.id_airline);
          this.updateForm.get('name_airline').setValue(data.jsonResponse.name_airline);
          this.updateForm.get('name_airport').setValue(data.jsonResponse.name_airport);

          data.jsonResponse.country.forEach(element => {
            document.getElementById(element+'__').setAttribute('checked', "true");
            this.arrayCountry(element);
          });

        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }


}