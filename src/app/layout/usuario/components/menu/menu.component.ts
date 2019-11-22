import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu_temp = [
    {
      name: "Chifrijo",
      recomendado: true
    }, {
      name: "Arroz con Pollo",
      recomendado: true
    }, {
      name: "Sufre de Atun",
      recomendado: false
    }, {
      name: "Cantones",
      recomendado: false
    },
  ];
  menu_list = [];


  constructor() { }

  ngOnInit() {
    let i = 0;
    this.menu_temp.forEach(element => {
      var name_short = element.name.replace(/\s/g, '');
      this.menu_temp[i]['short_name'] = name_short;
      i++;
    });

    //console.log(this.menu_temp);
    
    this.menu_list = this.menu_temp;
  }

  color_menu_b = 'primary';
  color_rec_b = 'gray';


  changeColor(b) {
    if (b == 0) {
      this.color_menu_b = 'primary';
      this.color_rec_b = 'gray';
      this.menu_list = []

      /* document.getElementById('b_menu').setAttribute('background-color','blue');
      document.getElementById('b_rec').setAttribute('background-color','white'); */
    } else {
      this.color_menu_b = 'gray';
      this.color_rec_b = 'primary';
      this.menu_list = []
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
        '<input id="propio" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked onclick="if(document.getElementById(\'propio\').checked) { document.getElementById(\'select_amigos\').setAttribute(\'disabled\',\'true\');document.getElementById(\'amigo\').checked=false} else{document.getElementById(\'select_amigos\').disabled=false; document.getElementById(\'amigo\').checked=true } ">  Propio  ' +
        '<input id="amigo" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">  Amigo' +
        '<select id="select_amigos" disabled> ' + html_options + ' </select> ',
      focusConfirm: false,
      preConfirm: () => {
        console.log((<HTMLInputElement>document.getElementById('propio')).checked);
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
}



/* 

html:
        '<input id="propio" type="checkbox" checked onclick=" if(document.getElementById(\'propio\').checked) { document.getElementById(\'select_amigos\').setAttribute(\'disabled\',\'true\');document.getElementById(\'amigo\').checked=false} else{document.getElementById(\'select_amigos\').disabled=false; document.getElementById(\'amigo\').checked=true } ">  Propio  ' +
        '<input id="amigo" type="checkbox" onclick=" if(document.getElementById(\'amigo\').checked) { document.getElementById(\'select_amigos\').setAttribute(\'disabled\',\'false\'); document.getElementById(\'propio\').checked=false} else{document.getElementById(\'select_amigos\').disabled=true; document.getElementById(\'propio\').checked=true } ">  Amigo' +
        '<select id="select_amigos" disabled> ' + html_options + ' </select> ',
      focusConfirm: false,


 html:
        '<input id="propio" type="checkbox" checked onclick="'+
        'if(document.getElementById(\'propio\').checked) '+
        '   { console.log("100");'+
        '     document.getElementById(\'select_amigos\').disasbled=true;'+
        '     document.getElementById(\'amigo\').checked=false'+
        '}else{ console.log("011");'+
        '       document.getElementById(\'select_amigos\').disabled=false;'+
        '       document.getElementById(\'amigo\').checked=true } "> Propio   ' +
        '<input id="amigo" type="checkbox" onclick=" '+
        'if( document.getElementById(\'amigo\').checked) { '+
        '   console.log("011"); '+
        '   document.getElementById(\'propio\').checked=false;'+
        '   document.getElementById(\'select_amigos\').disabled=false;'+
        '} else{console.log("100"); '+
        '       document.getElementById(\'propio\').checked=true;'+
        '       document.getElementById(\'select_amigos\').disasbled=true} ">Amigo <select id="select_amigos" disabled> ' + html_options + ' </select> ',
      focusConfirm: false,
*/