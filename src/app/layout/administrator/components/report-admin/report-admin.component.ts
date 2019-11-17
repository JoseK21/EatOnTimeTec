import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.scss']
})
export class ReportAdminComponent implements OnInit {


  passengerForm: FormGroup;
  datesForm: FormGroup;
  statusForm: FormGroup;

  submitted_p = false;
  submitted_d = false;
  submitted_s = false;


  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  get p() { return this.passengerForm.controls; }
  get d() { return this.datesForm.controls; }
  get s() { return this.statusForm.controls; }

  ngOnInit() {
  
    this.getAllFlightsSales();
    this.getStatus();
    this.getTopPassenger();

    this.passengerForm = this.formBuilder.group({
      id_user: ['', Validators.required]
    });

    this.datesForm = this.formBuilder.group({
      date_departure: ['', Validators.required],
      date_arrival: ['', Validators.required]
    });

    this.statusForm = this.formBuilder.group({
      status: ['', Validators.required],
    });
  }

  getReportAirlines() {
    this.getAllFlightsSales();
  }

  getTicketsPurchased() {
    this.getUserRange()
  }

  getMostVisitedDestinations() {
    this.getTopDestination();
  }

  getPushOperation() {
    this.getStatus();
  }

  operations: [];
  getP_Oparations() {
    this.http
      .get<any>(urls.api + 'getTopDestination', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse.resp) {
          this.top_ = data.jsonResponse.resp;
        } else {
          console.log("Error al cargar el top de destinos");
        }
      });
  }


  flight_sales = [];
  datas_flight_sales = [];
  json_array = [];
  getAllFlightsSales() {
    this.json_array = [];
    this.http
      .get<any>(urls.api + 'getAllFlightsSales', cors.httpOptions)
      .subscribe(data => {
        if (!data.message) {
          this.datas_flight_sales = [];
          for (let index = 0; index < data.length; index++) {
            let tem = JSON.parse(JSON.stringify(data[index])).flights;
            for (let index_aux2 = 0; index_aux2 < tem.length; index_aux2++) {
              let tem_2 = JSON.parse(JSON.stringify(tem[index_aux2]));
              if (tem_2.id_flight) {
                if (tem_2.sales.length == 0) {
                  let json = {
                    idAirline: JSON.parse(JSON.stringify(data[index])).idAirline,
                    id_flight: tem_2.id_flight,
                    total: 0,
                    sales: 0
                  };
                  this.json_array.push(json);
                } else {
                  let json = {
                    idAirline: JSON.parse(JSON.stringify(data[index])).idAirline,
                    id_flight: tem_2.id_flight,
                    total: tem_2.price * tem_2.sales,
                    sales: tem_2.sales
                  };
                  this.json_array.push(json);
                }
              } else {
                let json = {
                  idAirline: JSON.parse(JSON.stringify(data[index])).idAirline,
                  id_flight: tem_2.id_flight,
                  total: '',
                  sales: ''
                };
                this.json_array.push(json);
              }
            }
          }
        }
        else {
          console.log('Error al cargar los datos individuales');
        }
      });
  }


  rages_: [];
  getUserRange() {
    this.http
      .get<any>(urls.api + 'getUserRange', cors.httpOptions)
      .subscribe(data => {
        if (data.resp) {
          this.rages_ = JSON.parse(JSON.stringify(data.resp));
        } else {
          console.log("Error al cargar el rango de los vuelos por pasajero");
        }
      });
  }

  top_: [];
  getTopDestination() {
    this.http
      .get<any>(urls.api + 'getTopDestination', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse.resp) {
          this.top_ = data.jsonResponse.resp;
        } else {
          console.log("Error al cargar el top de destinos");
        }
      });
  }

  /* Report 4 */
  onSubmit_IdPassenger() {
    this.submitted_d = false;
    this.submitted_s = false;
    this.submitted_p = true;
    if (this.passengerForm.invalid) {
      return;
    }
    let data_ = this.passengerForm.value;
    this.http
      .post<any>(urls.api + 'getRA_Oper_IdUser', data_, cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          Swal.fire(
            'Amount of ticket purchase operations',
            'Of this user : <span style="color: #ff6600;">'+ data.jsonResponse.resp+ '</span>',
            'success'
          )
        } else {
          Swal.fire(
            'Opps.',
            'Id User does not exists',
            'error'
          )
        }
      });
  }

  onSubmit_Dates() {
    this.submitted_d = true;
    this.submitted_s = false;
    this.submitted_p = false;
    if (this.datesForm.invalid) {
      return;
    }
    let data_ = this.datesForm.value;
    this.http
      .post<any>(urls.api + 'getRA_Oper_Dates', data_, cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          Swal.fire(
            'Amount of ticket purchase operations',
            'From '+ data_.date_departure + ' to '+ data_.date_arrival+' : <span style="color: #ff6600;">'+ data.jsonResponse.resp+ '</span>',
            'success'
          )
        } else {
          Swal.fire(
            'Opps.',
            'There are no ticket purchase operations for these dates',
            'success'
          )
        }
      });

  }

  onSubmit_Status() {
    this.submitted_d = false;
    this.submitted_s = true;
    this.submitted_p = false;
    if (this.statusForm.invalid) {
      return;
    }
    let data_ = this.statusForm.value;
    this.http
      .post<any>(urls.api + 'getRA_Oper_Status', data_, cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          Swal.fire(
            'Amount of ticket purchase operations',
            'Status '+ data_.status +' : <span style="color: #ff6600;">'+ data.jsonResponse.resp+ '</span>',
            'success'
          )
        } else {
          Swal.fire(
            'Opps.',
            'There are no ticket purchase operations for this status',
            'error'
          )
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

  max_ = "";
  min_ = "";
  set_max(date_arrival) {
    document.getElementById("date_departure_").setAttribute('max', date_arrival);
  }

  set_min(date_departure) {
    document.getElementById("date_arrival_").setAttribute('min', date_departure);
  }




  name_1 = "";
  name_2 = "";
  name_3 = "";

  ids_user = [];
  getTopPassenger() {
    this.ids_user = [];
    this.http
      .get<any>(urls.api + 'getRA_3Best', cors.httpOptions)
      .subscribe(data => {
        if (data.jsonResponse) {
          let jsonID_Flights = JSON.parse(JSON.stringify(data.jsonResponse.resp));
          for (let index = 0; index < jsonID_Flights.length; index++) {
            let tem = JSON.parse(JSON.stringify(jsonID_Flights[index]));
            this.ids_user.push(tem.id_user);
          }
          console.log(this.ids_user);

          for (let index = 1; index < 4; index++) {
            this.findDuplicates(index);            
          }
          
          
        } else {
          console.log("Error al cargar los estados de un vuelo");
        }
      });
  }

  findDuplicates(index) {
    let id;
    let map = new Map();
    let max = 1;
    let maxRecurringString = "";
       for(id of this.ids_user) {   
          if(map.get(id) === undefined) {
             map.set(id, 1);
          } else {
             let count = map.get(id);
             count = count+1;
             map.set(id, count);
                 if(max < count) {
                    max = count;
                    maxRecurringString = id;
                 }
           }
    }

    if (index==1) {
      this.name_1 = maxRecurringString;
    }else if (index == 2) {
      this.name_2 = maxRecurringString;
    }else if (index == 3) {
      this.name_3 = maxRecurringString;
    }else{
      console.log('Fuera de rango');      
    }

    for( var i = 0; i < this.ids_user.length; i++){ 
      if ( this.ids_user[i] == maxRecurringString) {
        this.ids_user.splice(i, 1); 
        i--;
      }
   }
   console.log('Actual array : \n' + this.ids_user);
   

   //console.log("Maximum recurring string is ", maxRecurringString, ". Max number of times :" + max);
 }

}
