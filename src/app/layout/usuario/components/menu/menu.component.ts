import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu_list = [
    {
      name: "1"
    }, {
      name: "11"
    }, {
      name: "111"
    }, {
      name: "1111"
    },
  ];
  constructor() { }

  ngOnInit() {
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

    let opciones_amigos = ["Daniel", "José", "Marcelo" , "Sebastian"] ;

    let html_options = "";
    opciones_amigos.forEach(element => {
      html_options +=  " <option>"+ element +"</option> ";
    });


    /* const { value: formValues } =  */
    await Swal.fire({
      title: 'Añadir platillo',
      html:
        'Propio <input id="propio" type="checkbox" checked onclick=" if(document.getElementById(\'propio\').checked) { document.getElementById(\'select_amigos\').setAttribute(\'disabled\',\'true\')} else{document.getElementById(\'select_amigos\').disabled=false} ">' +
        'Amigo <select id="select_amigos" disabled> '+html_options+ ' </select> ',
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
