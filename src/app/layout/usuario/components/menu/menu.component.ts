import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from '../../../../config/urls';
import { cors } from '../../../../config/cors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient) { }

  ngOnInit() {
   
    this.get_recommendations();
    this.get_menu();
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


  async add(name) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    let opciones_amigos = ["Daniel", "José", "Marcelo", "Sebastian"];

    let html_options = "";
    opciones_amigos.forEach(element => {
      html_options += " <option>" + element + "</option> ";
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
            console.log('Rec: ',  this.recommendations);   
            this.recommendations.forEach(rec => {
              console.log(rec);
              
              if (rec['name'] == element['name']) {              
                this.menu[i]['recommendation'] = true;
              }    
              else{
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

}
