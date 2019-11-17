import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  Form: FormGroup;
  submitted = false;
  showModal = false;
  json_response: any = "2";

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getIdsFlights();
    this.Form = this.formBuilder.group({
      id_user: ['', Validators.required],
      id_flight: ['', Validators.required],
      _id: ['', Validators.required]
    });
  }

  get c() { return this.Form.controls; }

  find_id_sale = 0;
  data_json: any;


  onSubmit() {
    this.submitted = true;
    if (this.Form.invalid) {
      console.log("Form.invalid");
      return;
    }

    let data = this.Form.value;
    let id_u = data.id_user;
    let id_f = data.id_flight;
    let id = data._id;

    this.http
      .get<any>(urls.api + 'readSale/' + id_u + "/" + id_f + "/" + id, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          if (data.jsonResponse.resp.status == 'Checked') {
            Swal.fire({
              type: 'info',
              title: 'Oops...',
              text: 'Tickets Checked',
            });
          }
          else if (data.jsonResponse.resp.status == 'Used') {
            Swal.fire({
              type: 'info',
              title: 'Oops...',
              text: 'Tickets Used',
            });
          }
          else {
            this.http
              .put<any>(urls.api + 'updateSale/' + data.jsonResponse.resp._id + "/Checked", data.jsonResponse.resp, cors.httpOptions)
              .subscribe(data => {
                if (!data.message) {
                  Swal.fire({
                    title: 'Sales updates',
                    text: "The sale was updated",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  });
                  this.submitted = false;
                  this.Form.reset();
                } else {
                  console.log('error else : line 108');
                }
              });
          }
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
      });
  }


  id_flight = [];
  getIdsFlights() {
    this.id_flight = [];
    console.log('getIdsFlights()');
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
}
