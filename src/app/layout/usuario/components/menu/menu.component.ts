import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';
import { ServiceService } from 'app/shared/services/service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  array_dishes: Array<String> = [];
  constructor(private service: ServiceService, public router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.get_recommendations();
    this.get_menu();

    this.get_user_friends();
    
  }

  color_menu_b = 'primary';
  color_rec_b = 'gray';


  changeColor(b) {
    if (b == 0) {
      this.color_menu_b = 'primary';
      this.color_rec_b = 'gray';

      /* document.getElementById('b_menu').setAttribute('background-color','blue');
      document.getElementById('b_rec').setAttribute('background-color','white'); */
    } else {
      this.color_menu_b = 'gray';
      this.color_rec_b = 'primary';
      /* document.getElementById('b_menu').setAttribute('background-color','white');
      document.getElementById('b_rec').setAttribute('background-color','blue'); */
    }
  }



  lista_usuario_orden = [];
  lista_platillo_orden = [];

  async add(name) {
   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    let html_options = "";
    this.amigos_list.forEach(a_l => {
      html_options += " <option>" + a_l['friend_name'] + "</option> ";
    });


    /* const { value: formValues } =  */
    await Swal.fire({
      title: 'Añadir platillo',
      html:
        '<input id="propio" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked onclick="document.getElementById(\'select_amigos\').disabled=true">  Propio  ' +
        '<input id="amigo" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onclick="document.getElementById(\'select_amigos\').disabled=false">  Amigo' +
        '<select id="select_amigos" disabled> ' + html_options + ' </select> ',
      focusConfirm: false,
      preConfirm: () => {
        console.log((<HTMLInputElement>document.getElementById('propio')).checked);
        console.log((<HTMLInputElement>document.getElementById('amigo')).checked);
        console.log((<HTMLInputElement>document.getElementById('select_amigos')).value);

        if ((<HTMLInputElement>document.getElementById('propio')).checked) {
          
          this.service.add_user(localStorage.getItem('user_id'));
          this.service.add_dish(name);

        /*   this.lista_usuario_orden.push(localStorage.getItem('user_id'));
          this.lista_platillo_orden.push(name);

          localStorage.setItem('lista_usuario_orden', String(this.lista_usuario_orden));
          localStorage.setItem('lista_platillo_orden', String(this.lista_platillo_orden)); */

        } else {

          let id_amigo;
          this.amigos_list.forEach(element => {
            let amigo_name = (<HTMLInputElement>document.getElementById('select_amigos')).value;
            if (element['friend_name'] == amigo_name) {
              id_amigo = element['friend_id'];
            }
          });
          console.log(id_amigo);

          this.service.add_user(id_amigo);
          this.service.add_dish(name);

          /* this.lista_usuario_orden.push(id_amigo);
          this.lista_platillo_orden.push(name);

          localStorage.setItem('lista_usuario_orden', String(this.lista_usuario_orden));
          localStorage.setItem('lista_platillo_orden', String(this.lista_platillo_orden)); */
        }
      }
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Platillo Agregado',
          'El platillo se agrego correctamente',
          'success'
        )
      }
    })

  }


  crear_orden(){
    this.recommendations = [];
    this.http
      .get<any>(urls.api + 'menu/get/recommendations/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log('Recomendaciones');
        console.log(response_api);

        if (response_api.lenght == 0) {
          this.recommendations = [];
          console.log("Error al cargar el recommendations");
        }
        else {
          this.recommendations = response_api;
          let i = 0;
          this.recommendations.forEach(element => {
            var name_short = element['name'].replace(/\s/g, '');
            this.recommendations[i]['short_name'] = name_short;
            i++;
          });
        }
      });


  }

  menu: Array<String> = [];
  get_menu() {
    console.log('get_menu()');
    this.menu = [];
    this.http
      .get<any>(urls.api + 'menu/get', cors.httpOptions)
      .subscribe(response_api => {
        if (response_api.lenght == 0) {
          this.menu = [];
          console.log("Error al cargar el menu");
        }
        else {
          this.menu = response_api;
          console.log('Menú');
          console.log(this.menu);

          let i = 0;
          this.menu.forEach(element => {
            var name_short = element['name'].replace(/\s/g, '');
            this.menu[i]['short_name'] = name_short;



            console.log(element['name']);
            console.log('Rec: ', this.recommendations);
            this.recommendations.forEach(rec => {
              console.log(rec);

              if (rec['name'] == element['name']) {
                this.menu[i]['recommendation'] = true;
              }
              else {
                this.menu[i]['recommendation'] = false;
              }
            });
            i++;
          });
        }
      }, error => {
        console.log(error.error.text);
      }
      );
  }



  recommendations: Array<String> = [];
  get_recommendations() {
    console.log('get_recommendations()');
    this.recommendations = [];
    this.http
      .get<any>(urls.api + 'menu/get/recommendations/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log('Recomendaciones');
        console.log(response_api);

        if (response_api.lenght == 0) {
          this.recommendations = [];
          console.log("Error al cargar el recommendations");
        }
        else {
          this.recommendations = response_api;
          let i = 0;
          this.recommendations.forEach(element => {
            var name_short = element['name'].replace(/\s/g, '');
            this.recommendations[i]['short_name'] = name_short;
            i++;
          });
        }
      });
  }


  amigos_list: Array<String> = [];
  get_user_friends() {
    console.log('get_user_friends()');
    this.amigos_list = [];
    this.http
      .get<any>(urls.api + 'friend/get/' + localStorage.getItem('user_id'), cors.httpOptions)
      .subscribe(response_api => {
        console.log(response_api);

        if (response_api.lenght == 0) {
          this.amigos_list = [];
          console.log("Error al cargar las amigos_list");
        }
        else {
          this.amigos_list = response_api;
        }
      });
  }

}
