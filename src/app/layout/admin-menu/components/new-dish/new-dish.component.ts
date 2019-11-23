import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html',
  styleUrls: ['./new-dish.component.scss']
})
export class NewDishComponent implements OnInit {

 
  signUpForm: FormGroup;
  submitted = false;

  data: Date = new Date();
  focus;
  focus1;

  provincias__ = ["0", "1", "2", "3", "4", "5"];

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  fake_datas_random = 2020202020;
  ngOnInit() {

    /* {"name":"XXXX", "points": XXX, "ingredients":"XXX,XXX,XXX", "calories":XXX, "price":XXXX, "preference": X} */
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      points: ['', Validators.required],
      ingredients: ['', Validators.required],
      calories: ['', Validators.required],
      price: ['', Validators.required],
      preference: ['', Validators.required],
      time: ['', Validators.required],

    });
  } c

}
