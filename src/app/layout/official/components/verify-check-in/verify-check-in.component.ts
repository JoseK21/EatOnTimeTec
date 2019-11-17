import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-check-in',
  templateUrl: './verify-check-in.component.html',
  styleUrls: ['./verify-check-in.component.scss']
})
export class VerifyCheckInComponent implements OnInit {
  createForm: FormGroup;
  readForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  submitted_c = false;
  submitted_r = false;
  submitted_u = false;
  submitted_d = false;


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  get c() { return this.createForm.controls; }
  get r() { return this.readForm.controls; }
  get u() { return this.updateForm.controls; }
  get d() { return this.deleteForm.controls; }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      itinerary: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      maximum_capacity: ['', Validators.required]
    });
    this.readForm = this.formBuilder.group({
      id_user: ['', Validators.required],
      _id: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      itinerary: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      maximum_capacity: ['', Validators.required]
    });
    this.deleteForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }


  onSubmit_Create() {
    this.submitted_c = true;

    let data = this.createForm.value;
    data.restrictions = ['a', 'd'];
    data.features = ['f1', 'f2'];

    console.log(data);



    if (this.createForm.invalid) {
      return;
    }

  }

  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }
    let data = this.readForm.value;
    let id_u = data.id_user;
    let id = data._id;
    this.http
      .get<any>(urls.api + 'verifySale/' + id_u + "/" + id, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          if (data.jsonResponse.resp.status == 'Checked') {
            Swal.fire({
              type: 'success',
              title: 'Ticket Checked.'
            });
          } else if (data.jsonResponse.resp.status == 'Bought') {
            Swal.fire({
              type: 'warning',
              title: 'Ticket Bought.'
            });
          } else if (data.jsonResponse.resp.status == 'Canceled') {
            Swal.fire({
              type: 'error',
              title: 'Ticket Canceled.'
            });
          }else{
            Swal.fire({
              type: 'error',
              title: 'Ticket without status'
            });
          }
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Incorrect information, instruct the passenger to verify the email and try again.',
          });
        }


      });
  }

  onSubmit_Update() {
    this.submitted_u = true;
    if (this.updateForm.invalid) {
      let f_ = JSON.stringify(this.updateForm.value);
      console.log("Update Form Invalid\n" + f_);
      return;
    }

    let data = this.updateForm.value;
    console.log(data);
  }

  onSubmit_Delete() {
    this.submitted_d = true;
    if (this.deleteForm.invalid) {
      return;
    }

    let data = this.deleteForm.value;
    console.log(data);
  }

  forms_Reset() {
    this.submitted_c = false;
    this.createForm.reset();

    this.submitted_r = false;
    this.readForm.reset();

    this.submitted_u = false;
    this.updateForm.reset();

    this.submitted_d = false;
    this.deleteForm.reset();
  }


}
