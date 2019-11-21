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

  constructor() { }

  ngOnInit() { }


  acepto;
  comprar() {

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


        /* console.log((<HTMLInputElement>document.getElementById('puntos')).value); */
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
  }
}
