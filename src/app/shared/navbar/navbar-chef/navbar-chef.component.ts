import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar-chef',
  templateUrl: './navbar-chef.component.html',
  styleUrls: ['./navbar-chef.component.scss']
})
export class NavbarChefComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  show(){
    Swal.fire(
      'Ordenes Confirmadas',
      'No hay ordenes confirmadas por el momento',
      'info'
    )
  }

}
