import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {

  Form: FormGroup;
  submitted = false;
  showModal = false;
  json_response: any = "2";

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getCountries();
    this.Form = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required]
    });
  }

  get b() { return this.Form.controls; }


  json_buy = [];
  onSubmit() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    let data = this.Form.value;
    this.showModal = true;
    this.http
      .post<any>(urls.api + 'getFlight_to_BuyTickecks', data, cors.httpOptions)
      .subscribe(data => {
        if (data.message) {
          Swal.fire({
            title: 'Trip not found',
            text: "There are no flights available for these dates / countries",
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {
          this.json_response = true;
          this.json_buy = data.resp;
        }
      });
  }

  clickFlight(flight) {
    let observations: string;
    Swal.mixin({
      input: 'number',
      inputAttributes: {
        min: "1",
        max: "10",
        required: 'true'
      },
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Tickets',
        text: 'Select the amount of tickets you want',
      }, {
        title: 'Suitcases',
        text: 'Select the amount of travel bags you will carry',
      },
    ]).then((result_1) => {
      if (result_1.value) {
        Swal.fire({
          title: 'You have some observation for the trip',
          text: 'This observation is optional.',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
            required: 'true'
          },
          showCancelButton: true,
          confirmButtonText: 'Add observation',
          cancelButtonText: 'No observation',

          showLoaderOnConfirm: true,
          preConfirm: (observation_2) => {
            observations = observation_2;
          },

          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          /*  id_user    id_flight   origin   destination  date_departure  date_arrival  tickets   suitcases  observation    status   seat */
          let data_ = {};
          if (result.value) {
            let data_json =
            {
              id_user: localStorage.getItem("id_user"),
              id_flight: flight.id_flight,
              origin: flight.origin,
              destination: flight.destination,
              date_departure: flight.date_departure,
              date_arrival: flight.date_arrival,
              tickets: result_1.value[0],
              suitcases: result_1.value[1],
              status: 'Bought',
              observation: observations,
              seat: -1,
            };
            data_ = data_json;
          } else {
            let data_json =
            {
              id_user: localStorage.getItem("id_user"),
              id_flight: flight.id_flight,
              origin: flight.origin,
              destination: flight.destination,
              date_departure: flight.date_departure,
              date_arrival: flight.date_arrival,
              tickets: result_1.value[0],
              suitcases: result_1.value[1],
              status: 'Bought',
              seat: -1,
            };
            data_ = data_json;
          }
          this.http
            .post<any>(urls.api + 'createSale', data_, cors.httpOptions)
            .subscribe(data => {
              if (!data.message) {
                Swal.fire({
                  title: 'Purchase made',
                  text: "The purchase was successfully made",
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                });
                this.sent_email(localStorage.getItem("id_user"), data.jsonResponse._id, data.jsonResponse.id_flight)
                this.json_response = false;
                this.submitted = false;
                this.Form.reset();
              } else {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: data.message,
                })
              }
            });
        }
        );
      }
    });
  }

  sent_email(id_user, _id, id_flight) {
    this.http
      .get<any>(urls.api + 'getEmail/' + id_user, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          console.log('Sendind email');
          let email = data.jsonResponse.email;
          this.http
            .post<any>(urls.api + 'sendEmail/' + email + '/' + _id + '/' + id_flight, cors.httpOptions)
            .subscribe(data => {
              if (data.info) {
                console.log("Email Sent");
              } else {
                console.log("Error al enviar el email");
              }
            });




        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops... Email no send',
            text: data.message,
          })
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

  filter_array_destination(invisible_element) {
    var filtered = this.countries.filter(function (value, index, arr) {
      return value != invisible_element;
    });
    this.origin_ = filtered;
    this.json_response = false;
  }

  filter_array_origin(invisible_element) {
    var filtered = this.countries.filter(function (value, index, arr) {
      return value != invisible_element;
    });
    this.destination_ = filtered;
    this.json_response = false;
  }

  format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
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
