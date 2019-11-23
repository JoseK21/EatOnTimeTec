import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';
import { ServiceService } from 'app/shared/services/service.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {

  constructor(private service: ServiceService, public router: Router, private http: HttpClient) { }

  list_dishes = [];
  list_users = [];

  new_list_propios = [];
  new_list_amigos = [];

  list_empty = true;
  priceTotal = "";
  punts = "";

  ngOnInit() {
    this.load_datas();
  }

  load_datas() {
    this.list_users = this.service.get_lista_users();
    this.list_dishes = this.service.get_lista_dishes();


    if (this.list_dishes.length == 0) {
      this.list_empty = true;
      this.priceTotal = "---";
      this.punts = "---";

      Swal.fire(
        'Información',
        'Para realizar una compra previamente debe agregar platillos a la orden',
        'info'
      )

    } else {
      this.list_empty = false;
      this.priceTotal = "2 250";
      this.punts = "45";

      let i = 0;
      this.list_dishes.forEach(element => {

        if (this.list_users[i] == localStorage.getItem('user_id')) {
          this.new_list_propios.push(element);
        } else {
          this.new_list_amigos.push(element);
        }
        i++
      });
    }
  }


  async add_observacion(item) {

    const { value: observacion } = await Swal.fire({
      title: 'Observación',
      input: 'text',
      inputPlaceholder: 'Ingrese la observación'
    })
    if (observacion) {
      if (String(observacion).trim() != "") {
        this.lista_observaciones.push(observacion);
        Swal.fire('Observacion registrada',
          '',
          'success');
      }
    }
  }


  remove_dish(item) {
    Swal.fire('Platillo removido',
      'Platillo ' + item + ' removido exitosamente',
      'success');
  }



  lista_observaciones = [];
  acepto;
  comprar() {    
    let pts = "123";
    Swal.fire({
      title: '¿Quieres aplicar un descuento?',
      text: 'Tus puntos totales son: ' + pts,
      html:
      'Tus puntos totales son: ' + pts +
      '<br/>¿Cuántos puntos quieres usar? <input id="puntos" type="number" min="1" max="' + pts + '">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Utilizar',
      cancelButtonText: 'No'

    }).then((result) => {
      console.log('Puntos utilizados : ' + (<HTMLInputElement>document.getElementById('puntos')).value);
      if (result.value) {
        Swal.fire(
          'Compra realizada',
          'Descuento aplicado con exito',
          'success'
        );

        
    let data = {
      users: this.service.get_lista_users(),
      dishes: this.service.get_lista_dishes(),
      observations: this.lista_observaciones
    }

    console.log(data);
    this.http
      .post<any>(urls.api + 'order/place', data, cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);
        // {"idOrder":568,"idClient":116920112,"idCook":334342343,"date":1574382420000,"rating":null,"observation":"No observation"}
        if (response_api.length == 0) {
          Swal.fire({
            title: 'Error',
            text: 'Error al crear la orden, intente de nuevo',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire(
            'Orden registrada',
            'Puede cancelar su orden en un lapso de 2 minutos',
            'success'
          );
          this.gotoProductDetailsV2('orden_proceso');
        }
      }, error => {
        console.log(error);
      });
      }
    })
  }

  como_pago() {
    Swal.fire(
      '¿Como pago la orden?',
      'El cargo de la orden será referida al Departamento Financiero',
      'info'
    )
  }

  public gotoProductDetailsV2(id) {

    let url = '/usuario'
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
