import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';
import { ServiceService } from 'app/shared/services/service.service';
import { OtherService } from 'app/shared/services/service/other.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html',
  styleUrls: ['./new-dish.component.scss']
})
export class NewDishComponent implements OnInit {

 
  form: FormGroup;
  submitted = false;
  focus;
  focus1;

  constructor(private formBuilder: FormBuilder, public router: Router, private service: ServiceService,private call: OtherService ) { }

  fake_datas_random = 2020202020;
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      /* time: ['', Validators.required], */
      calories: ['', Validators.required],
      ingredients: ['', Validators.required],
      preference: ['', Validators.required],
      points: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("registerForm.invalid");
      return;
    }
    let data = this.form.value;

    if (this.call.post_dish_add(data) == true) {
      Swal.fire({
        type: 'success',
        title: 'Exito',
        text: "Platillo agregado correctamente",
      })
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: "Error al agregar platillo",
      })
    }
    
    
    this.submitted = false;
    this.form.reset();
  }

}
