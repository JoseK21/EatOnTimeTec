import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.scss']
})
export class BoardingComponent implements OnInit {

  readForm: FormGroup;
  submitted_r = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  get r() { return this.readForm.controls; }

  ngOnInit() {
    this.readForm = this.formBuilder.group({
      id_user: ['', Validators.required],
      id_flight: ['', Validators.required],
      _id: ['', Validators.required]
    });
  }

  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }
    let data = this.readForm.value;
    console.log(data);
    let id_u = data.id_user;
    let id_f = data.id_flight;
    let id = data._id;

    this.http
      .get<any>(urls.api + 'readSale/' + id_u + "/" + id_f + "/" + id, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          if (data.jsonResponse.resp.status == 'Bought') {
            Swal.fire({
              type: 'info',
              title: 'Oops...',
              text: 'Tickets Bought',
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
              .put<any>(urls.api + 'updateSale/' + data.jsonResponse.resp._id + "/Used", data.jsonResponse.resp, cors.httpOptions)
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
                  this.submitted_r = false;
                  this.readForm.reset();
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

  forms_Reset() {
    this.submitted_r = false;
    this.readForm.reset();
  }


}
