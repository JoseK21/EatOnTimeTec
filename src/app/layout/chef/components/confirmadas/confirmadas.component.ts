import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmadas',
  templateUrl: './confirmadas.component.html',
  styleUrls: ['./confirmadas.component.scss']
})
export class ConfirmadasComponent implements OnInit {

  orden_list = [
    {
    dish:'Cantones' ,
    ingredients:'Arroz, Chile'    
   },
   {
    dish:'Arroz con Carne' ,
    ingredients:'Arroz, Carne, Zanahoria'    
   },
   {
    dish:'Pescado al ajillo' ,
    ingredients:'Pescado, ajo'    
   }
  
  ]


  constructor() { }

  ngOnInit() {
  }

}
