import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    
 
  show_messange(){
    Swal.fire(
      'Estadisticas no habilitadas',
      'Pronto contara con esta caracteristica',
      'info'
    )
  }

}
