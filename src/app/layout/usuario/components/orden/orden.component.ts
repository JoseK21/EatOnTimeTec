import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  list_platillos = [];
  list_amigos = [];

  new_list_propios = [];
  new_list_amigos = [];

  ngOnInit() {
    this.load_datas();
   }

   load_datas(){
     // JSON.parse(
    this.list_platillos = Array(localStorage.getItem('lista_platillo_orden'));
    console.log(this.list_platillos);

    this.list_amigos = Array(localStorage.getItem('lista_usuario_orden'));
    console.log(this.list_amigos);

    let i = 0;
    this.list_platillos.forEach(element => {
      console.log(Array(localStorage.getItem('lista_usuario_orden'))[i]);
      console.log(localStorage.getItem('user_id'));
      
      if (Array(localStorage.getItem('lista_usuario_orden'))[i] == localStorage.getItem('user_id')) {
        this.new_list_propios.push(element);
      } else {
        this.new_list_amigos.push(element);
      }
      i++
    });
  
   }


  async add_observacion(){
    const { value: observacion } = await Swal.fire({
      title: 'Observación',
      input: 'text',
      inputPlaceholder: 'Ingrese la observación'
    })
    
    if (observacion) {
      this.lista_observaciones.push(observacion);
      Swal.fire('Observacion registrada:',
      '',
      'success');      
    }


  }

  lista_observaciones = [];
  acepto;
  comprar() {

    let lista_usuario_orden = JSON.parse(localStorage.getItem('lista_usuario_orden'));
    let lista_platillo_orden = JSON.parse(localStorage.getItem('lista_platillo_orden'));

    console.log(lista_usuario_orden);
    console.log(lista_platillo_orden);

    let pts = "123";
    Swal.fire({
      title: '¿Quieres aplicar un descuento?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      reverseButtons: true,
      html:
        'Tus puntos totales son: ' + pts /* +
          '<br/>¿Cuántos puntos quieres usar? <input id="puntos" type="number" name="quantity" min="1" max="5">' */,
      focusConfirm: false,
      preConfirm: () => {
        console.log("Sol num punt");
        this.acepto = true;
      }
    })

    if (this.acepto) {
      console.log("Accepto");
      Swal.mixin({
        input: 'number',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true
      }).queue([
        {
          title: 'Puntos',
          text: 'Ingrese la cantidad a utilizar'
        }
      ]).then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          Swal.fire({
            title: 'All done!',
            html: `
                Your answers:
                <pre><code>${answers}</code></pre>
              `,
            confirmButtonText: 'Lovely!'
          })
        }
      })
    }

    else{

    }

    this.lista_observaciones;

    let data = {
      users: lista_usuario_orden,
      dishes: lista_platillo_orden,
      observations:  this.lista_observaciones
    }

    this.http
    .post<any>(urls.api + 'order/place', data, cors.httpOptions)
    .subscribe(response_api => {

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
        this.router.navigateByUrl('/orden_proceso');

      }
    }, error => {
      alert('error');
    });

  }
}
