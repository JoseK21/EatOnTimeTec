import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-official',
  templateUrl: './report-official.component.html',
  styleUrls: ['./report-official.component.scss']
})
export class ReportOfficialComponent implements OnInit {

  num_table = 0;
  datesForm: FormGroup;
  statusForm: FormGroup;
  userForm: FormGroup;

  submitted_dates = false;
  submitted_status = false;
  submitted_user = false;


  json_response: boolean = false;

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get dates() { return this.datesForm.controls; }
  get status() { return this.statusForm.controls; }
  get user() { return this.userForm.controls; }

  ngOnInit() {
    this.getStatus();
    this.getNamesPassengers();

    this.datesForm = this.formBuilder.group({
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required]
    });

    this.statusForm = this.formBuilder.group({
      status: ['', Validators.required]
    });

    this.userForm = this.formBuilder.group({
      name_user: ['', Validators.required]
    });

  }

  flight_dates = [];
  onSubmit_Dates() {
    this.submitted_dates = true;
    if (this.datesForm.invalid) {
      this.num_table = 0;
      return;
    }
    let data = this.datesForm.value;
    this.http
      .post<any>(urls.api + 'getFlight_R1_dates', data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.flight_dates = data.resp;
          this.num_table = 1;
        } else {
          this.num_table = 0;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }

  flight_status = [];
  onSubmit_Status() {
    this.submitted_status = true;
    if (this.statusForm.invalid) {
      this.num_table = 0;
      return;
    }
    let data = this.statusForm.value;
    this.http
      .post<any>(urls.api + 'getFlight_R1_status', data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.flight_status = data.resp;
          this.flight_dates = [];
          this.num_table = 2;
        } else {
          this.num_table = 0;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }


  /* names_ */

  flight_user = [];
  onSubmit_User() {
    this.submitted_user = true;
    if (this.userForm.invalid) {
      this.num_table = 0;
      return;
    }
    let data = this.userForm.value;
    console.log(data);
    this.getID_user(data.name_user);
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

  names_ = [];
  getNamesPassengers() {
    this.http
      .get<any>(urls.api + 'getNamesPassengers', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          let jsonNames = JSON.parse(JSON.stringify(data.resp));
          for (let index = 0; index < jsonNames.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonNames[index]));
            this.names_.push(tem.name);
          }
        } else {
          console.log("Error al cargar las nacionalidades");
        }
      });
  }

  id_user_ = "";
  id_flights_ = [];
  flight_userName = [];
  getID_user(name_user) {
    this.http
      .get<any>(urls.api + 'getID_user/' + name_user, cors.httpOptions)
      .subscribe(data => {
        console.log(data);

        if (data.jsonResponse) {
          this.id_user_ = data.jsonResponse.id_user;
          this.http
            .get<any>(urls.api + 'getIdFlightsIdUser/' + this.id_user_, cors.httpOptions)
            .subscribe(data => {
              if (!data.message) {
                this.id_flights_ = [];
                let jsonID_Flights = JSON.parse(JSON.stringify(data.jsonResponse.resp));
                for (let index = 0; index < jsonID_Flights.length; index++) {
                  let tem = JSON.parse(JSON.stringify(jsonID_Flights[index]));
                  this.id_flights_.push(tem.id_flight);
                }

                /* Elimina ids repetidos */
                var unique = this.id_flights_.filter(function (elem, index, self) {
                  return index === self.indexOf(elem);
                })

                let json = {
                  "id_flight": unique
                };

                this.http
                  .post<any>(urls.api + 'getFlight_R1_name', json, cors.httpOptions)
                  .subscribe(data => {                    
                    if (!data.message) {
                      this.json_response = true;
                      this.flight_userName = data.resp;
                      this.num_table = 3;
                    } else {
                      this.num_table = 0;
                      Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: data.message,
                      })
                    }
                  });
              } else {
                console.log('Error al obtener los id_flight de una persona');
              }
            });
        } else {
          console.log("Error al obtener el id del usuario (name)");
        }
      });
  }


  forms_Reset() {
    this.json_response = false; /* Show table */

    this.submitted_dates = false;
    this.datesForm.reset();


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
