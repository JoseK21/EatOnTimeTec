import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consult-info-passenger',
  templateUrl: './consult-info-passenger.component.html',
  styleUrls: ['./consult-info-passenger.component.scss']
})
export class ConsultInfoPassengerComponent implements OnInit {

  readForm: FormGroup;
  submitted_r = false;


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  get r() { return this.readForm.controls; }

  ngOnInit() {
    this.readForm = this.formBuilder.group({
      id_user: ['', Validators.required]
    });
  }

  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }

    let data = this.readForm.value;
    console.log(data);
    this.get_infoUser(data.id_user)
  }

  forms_Reset() {
    this.submitted_r = false;
    this.readForm.reset();
  }

  get_infoUser(id_user) {
    this.http
      .get<any>(urls.api + 'readPassenger/' + id_user, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          document.getElementById('name').setAttribute('value',data.jsonResponse.name);
          document.getElementById('date_birth').setAttribute('value',data.jsonResponse.date_birth);
          document.getElementById('phone').setAttribute('value',data.jsonResponse.phone);
          document.getElementById('nationality').setAttribute('value',data.jsonResponse.nationality);
          document.getElementById('residence').setAttribute('value',data.jsonResponse.residence);
          document.getElementById('email').setAttribute('value',data.jsonResponse.email);
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          });
          this.forms_Reset();
        }
      });
  }

}
