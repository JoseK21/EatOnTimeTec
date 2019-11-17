import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  createForm: FormGroup;
  readForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  submitted_c = false;
  submitted_r = false;
  submitted_u = false;
  submitted_d = false;

  list_restrictions: string[];
  list_features: string[];
  json_response: boolean = false;

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get c() { return this.createForm.controls; }
  get r() { return this.readForm.controls; }
  get u() { return this.updateForm.controls; }
  get d() { return this.deleteForm.controls; }

  ngOnInit() {

    this.getCountries();
    this.getStatus();
    this.getRestrictions();
    this.getFeatures();

    this.getIdsAirline();
    this.getIdsFlights();

    this.createForm = this.formBuilder.group({
      id_flight: ['', Validators.required],
      id_airline: ['', Validators.required],
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required],
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      itinerary: ['', Validators.required],
      price: ['', Validators.required],
      /* restrictions: ['', Validators.required],
      features: ['', Validators.required], */
      status: ['', Validators.required],
      max_capacity: ['', Validators.required]
    });
    this.readForm = this.formBuilder.group({
      id_flight: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      id_flight: ['', Validators.required],
      id_airline: ['', Validators.required],
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required],
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      itinerary: ['', Validators.required],
      price: ['', Validators.required],
      /* restrictions: ['', Validators.required],
      features: ['', Validators.required], */
      status: ['', Validators.required],
      max_capacity: ['', Validators.required]
    });
    this.deleteForm = this.formBuilder.group({
      id_flight: ['', Validators.required]
    });
  }

  onSubmit_Create() {
    this.submitted_c = true;
    let data = this.createForm.value;
    data.restrictions = this.array_Restrictions;
    data.features = this.array_Features;
    if (this.createForm.invalid) {
      return;
    }
    this.http
      .post<any>(urls.api + 'createFlight', data, cors.httpOptions)
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
            type: 'success',
            title: 'The Flight has been saved',
            showConfirmButton: false,
            timer: 2000
          });
          this.getFeatures();
          this.getRestrictions();
          this.submitted_c = false;
          this.createForm.reset();
        }
      }, error => {
        alert('error');
      });
  }

  flight_read = {};
  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }
    let data = this.readForm.value;
    this.http
      .get<any>(urls.api + 'readFlight/' + data.id_flight, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.flight_read = data.jsonResponse;
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
  onchangeUpdate(id_flight) {
    this.http
      .get<any>(urls.api + 'readFlight/' + id_flight, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.updateForm.get('name').setValue(data.jsonResponse.name);
          this.updateForm.get('id_airline').setValue(data.jsonResponse.id_airline);

          this.updateForm.get('date_departure').setValue(data.jsonResponse.date_departure.substring(0, 10));
          this.updateForm.get('date_arrival').setValue(data.jsonResponse.date_arrival.substring(0, 10));

          this.updateForm.get('origin').setValue(data.jsonResponse.origin);
          this.updateForm.get('destination').setValue(data.jsonResponse.destination);
          this.updateForm.get('itinerary').setValue(data.jsonResponse.itinerary);
          this.updateForm.get('price').setValue(data.jsonResponse.price);
          this.updateForm.get('status').setValue(data.jsonResponse.status);
          this.updateForm.get('max_capacity').setValue(data.jsonResponse.max_capacity);

          data.jsonResponse.restrictions.forEach(element => {
            document.getElementById(element).setAttribute('checked', "true");
            this.arrayRestrictions(element);
          });

          data.jsonResponse.features.forEach(element => {
            document.getElementById(element).setAttribute('checked', "true");
            this.arrayFeatures(element);
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

  onSubmit_Update() {
    this.submitted_u = true;
    if (this.updateForm.invalid) {
      return;
    }
    let data = this.updateForm.value;
    data.restrictions = this.array_Restrictions;
    data.features = this.array_Features;
    this.http
      .put<any>(urls.api + 'updateFlight/' + data.id_flight, data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Flight updates',
            text: "The flight was updated",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.getFeatures();
          this.getRestrictions();
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
      .delete<any>(urls.api + 'deleteFlight/' + data.id_flight, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Flight deleted',
            text: "The flight was deleted",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.getIdsFlights();
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
    this.getIdsFlights();
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

  array_Restrictions: Array<string> = [];
  arrayRestrictions(restriction) {
    if (this.array_Restrictions.includes(restriction)) {
      for (var i = 0; i < this.array_Restrictions.length; i++) {
        if (this.array_Restrictions[i] === restriction) {
          this.array_Restrictions.splice(i, 1);
        }
      }
    } else {
      this.array_Restrictions.push(restriction);
    }
  }

  array_Features: Array<string> = [];
  arrayFeatures(feature) {
    if (this.array_Features.includes(feature)) {
      for (var i = 0; i < this.array_Features.length; i++) {
        if (this.array_Features[i] === feature) {
          this.array_Features.splice(i, 1);
        }
      }
    } else {
      this.array_Features.push(feature);
    }
  }

  status: [];
  getStatus() {
    this.status = [];
    this.http
      .get<any>(urls.api + 'getStatus', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.status = JSON.parse(JSON.stringify(data.jsonResponse)).status;
        } else {
          console.log("Error al cargar los estados de un vuelo");
        }
      });
  }


  restrictions: [];
  getRestrictions() {
    this.restrictions = [];
    this.http
      .get<any>(urls.api + 'getRestrictions', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.restrictions = JSON.parse(JSON.stringify(data.jsonResponse)).restrictions;
        } else {
          console.log("Error al cargar las restricciones de un vuelo");
        }
      });
  }


  features: [];
  getFeatures() {
    this.features = [];
    this.http
      .get<any>(urls.api + 'getFeatures', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.features = JSON.parse(JSON.stringify(data.jsonResponse)).features;
        } else {
          console.log("Error al cargar las caracteristicas de un vuelo");
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


  id_flight = [];
  getIdsFlights() {
    this.id_flight = [];
    this.http
      .get<any>(urls.api + 'getIdsFlights', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonIdsFlights = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonIdsFlights.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonIdsFlights[index]));
            this.id_flight.push(tem.id_flight);
          }
        } else {
          console.log("Error al cargar los ids flight");
        }
      });
  }

  origin_ = [];
  destination_ = [];
  countries = [];

  getCountries() {
    this.http
      .get<any>(urls.api + 'getCountries', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.countries = JSON.parse(JSON.stringify(data.jsonResponse)).country;
          this.origin_ = this.countries;
          this.destination_ = this.countries;
        } else {
          console.log("Error al cargar los paises (origin&destination)");
        }
      });
  }

  filter_array_origin(invisible_element) {
    var filtered = this.countries.filter(function (value, index, arr) {
      return value != invisible_element;
    });
    this.destination_ = filtered;
  }

  filter_array_destination(invisible_element) {
    var filtered = this.countries.filter(function (value, index, arr) {
      return value != invisible_element;
    });
    this.origin_ = filtered;
  }

  max_ = "";
  min_ = "";

  set_max(date_arrival) {
    document.getElementById("date_departure_").setAttribute('max', date_arrival);
  }

  set_min(date_departure) {
    document.getElementById("date_arrival_").setAttribute('min', date_departure);
  }


}
