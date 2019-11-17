import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-passenger',
  templateUrl: './report-passenger.component.html',
  styleUrls: ['./report-passenger.component.scss']
})
export class ReportPassengerComponent implements OnInit {

  statusForm: FormGroup;
  datesForm: FormGroup;

  submitted_dates = false;
  submitted_status = false;
  showtable:boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  get dates() { return this.datesForm.controls; }
  get status() { return this.statusForm.controls; }

  ngOnInit() { 
    /* this.getIdsFlights(); */
    this.getStatus();

    this.datesForm = this.formBuilder.group({
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required]
    });

    this.statusForm = this.formBuilder.group({
      status: ['', Validators.required],
    });
  }

  onSubmit_Dates() {
    this.submitted_dates = true;
    if (this.datesForm.invalid) {
      return;
    }
    let data = this.datesForm.value;
    this.getReport(1, data);
  }

  onSubmit_Status() {
    this.submitted_status = true;
    if (this.statusForm.invalid) {
      return;
    }
    let data = this.statusForm.value;
    this.getReport(2, data);
  }

  max_ = "";
  min_ = "";
  set_max(date_arrival) {
    document.getElementById("date_departure_").setAttribute('max', date_arrival);
  }

  set_min(date_departure) {
    document.getElementById("date_arrival_").setAttribute('min', date_departure);
  }


  id_user_ = "";
  id_flights_ = [];
  flight_userName = [];

  id_flights_Filter = [];
  getReport(filtro, json) {
    this.id_user_ = localStorage.getItem('id_user');
    this.http
      .get<any>(urls.api + 'getIdFlightsIdUser/' + this.id_user_, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.id_flights_ = [];  /* Id de los vuelos que tiene asociado cada usuario en sus compras */
          let jsonID_Flights = JSON.parse(JSON.stringify(data.jsonResponse.resp));
          for (let index = 0; index < jsonID_Flights.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonID_Flights[index]));
            this.id_flights_.push(tem.id_flight);
          }

          /* Elimina ids repetidos */
          var unique = this.id_flights_.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          })
          json.id_flight = unique;

          if (filtro == 1) {
            this.http
              .post<any>(urls.api + 'getFlight_R2_dates', json, cors.httpOptions)
              .subscribe(data => {
                if (!data.message) {
                  this.showtable = true;
                  this.flight_userName = data.resp;
                } else {
                  this.showtable = false;
                  Swal.fire({
                    type: 'info',
                    title: 'Oops...',
                    text: 'There are no associated flights for this date range',
                  })
                }
              });
          } else {
            this.http
              .post<any>(urls.api + 'getFlight_R2_status', json, cors.httpOptions)
              .subscribe(data => {
                if (!data.message) {
                  this.showtable = true;
                  this.flight_userName = data.resp;
                } else {
                  this.showtable = false;
                  Swal.fire({
                    type: 'info',
                    title: 'Oops...',
                    text: 'There are no associated flights for this type of flight',
                  })
                }
              });
          }
        } else {
          console.log('Error al obtener los id_flight de una persona');
        }
      });
  }


  status_: [];
  getStatus() {
    this.http
      .get<any>(urls.api + 'getStatus', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.status_ = JSON.parse(JSON.stringify(data.jsonResponse)).status;
        } else {
          console.log("Error al cargar los estados de un vuelo");
        }
      });
  }

}
