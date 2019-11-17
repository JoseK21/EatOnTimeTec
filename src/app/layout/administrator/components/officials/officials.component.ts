import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.scss']
})
export class OfficialsComponent implements OnInit {
  createForm: FormGroup;
  readForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  submitted_c = false;
  submitted_r = false;
  submitted_u = false;
  submitted_d = false;

  json_response = false; /* Show table official */
  
  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get c() { return this.createForm.controls; }
  get r() { return this.readForm.controls; }
  get u() { return this.updateForm.controls; }
  get d() { return this.deleteForm.controls; }

  ngOnInit() {
    this.getWorkAreas(); 
    this.getTypeOfficial();
    this.getIdsUser_Official();

    this.createForm = this.formBuilder.group({
      id_user: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      date_admission: ['', Validators.required],
      work_area: ['', Validators.required]
    });
    this.readForm = this.formBuilder.group({
      id_user: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({      
      id_user: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      date_admission: ['', Validators.required],
      work_area: ['', Validators.required]
    });
    this.deleteForm = this.formBuilder.group({
      id_user: ['', Validators.required]
    });
  }


  onSubmit_Create() {
    this.submitted_c = true;
    if (this.createForm.invalid) {
      return;
    }
    let data = this.createForm.value;
    data.rol = "official";
    data.password = data.id_user;
    console.log(data);
    this.http
      .post<any>(urls.api + 'register', data, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Official created',
            text: "The official was created",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.submitted_c = false;
          this.createForm.reset();
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });

  }

  
  official_read_ = {};
  onSubmit_Read() {
    this.submitted_r = true;
    if (this.readForm.invalid) {
      return;
    }

    let data = this.readForm.value;
    console.log(data);
    this.http
      .get<any>(urls.api + 'readOfficial/' + data.id_user, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.json_response = true;
          this.official_read_ = data.jsonResponse;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.message,
          })
        }
      });
  }


  official_update = {};
  onchangeUpdate(id_user) {
    this.http
      .get<any>(urls.api + 'readUser/' + id_user, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          console.log('onchangeUpdate');
          this.updateForm.get('name').setValue(data.jsonResponse.name);
          this.updateForm.get('type').setValue(data.jsonResponse.type);
          this.updateForm.get('date_admission').setValue(data.jsonResponse.date_admission);
          this.updateForm.get('work_area').setValue(data.jsonResponse.work_area);
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
      let f_ = JSON.stringify(this.updateForm.value);
      console.log("Update Form Invalid\n"+f_);
      return;
    }
    let data = this.updateForm.value;
    console.log(data);
    this.http
    .put<any>(urls.api + 'updateOfficial/' + data.id_user, data, cors.httpOptions)
    .subscribe(data => {
      if (!data.message) {
        Swal.fire({
          title: 'Official updated',
          text: "The official was updated",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
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
      .delete<any>(urls.api + 'deleteOfficial/' + data.id_user, cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          Swal.fire({
            title: 'Official deleted',
            text: "The official was deleted",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          this.getIdsUser_Official();
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

  forms_Reset(){
    this.json_response = false;
    this.getIdsUser_Official();

    this.submitted_c = false;
    this.createForm.reset();

    this.submitted_r = false;
    this.readForm.reset();

    this.submitted_u = false;
    this.updateForm.reset();

    this.submitted_d = false;
    this.deleteForm.reset();
  }


  work_area: [];
  getWorkAreas() {
    console.log('getWorkAreas()');
    this.http
      .get<any>(urls.api + 'getWorkAreas', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.work_area = JSON.parse(JSON.stringify(data.jsonResponse)).work_area;
        } else {
          console.log("Error al cargar las areas de trabajo");
        }
      });
  }

  type_official: [];
  getTypeOfficial() {
    console.log('getTypeOfficial()');
    this.http
      .get<any>(urls.api + 'getTypeOfficial', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          this.type_official = JSON.parse(JSON.stringify(data.jsonResponse)).type_official;
        } else {
          console.log("Error al cargar los tipos de funcionarios");
        }
      });
  }

  official_read = [];
  getIdsUser_Official() {
    this.official_read = [];
    console.log('getIdsUser_Official()');
    this.http
      .get<any>(urls.api + 'getIdsUser_Official', cors.httpOptions)
      .subscribe(data => {
        
        if (data.resp) {
          let jsonIdsAirport = JSON.parse(JSON.stringify(data.resp));          
          for (let index = 0; index < jsonIdsAirport.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonIdsAirport[index]));
            this.official_read.push(tem.id_user);
          }
        } else {
          console.log("Error al cargar los id de funcionarios");
        }
      });
  }
}
