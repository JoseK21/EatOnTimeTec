import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-orden-proceso',
  templateUrl: './orden-proceso.component.html',
  styleUrls: ['./orden-proceso.component.scss']
})
export class OrdenProcesoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.oberserableTimer();
  }
  subscribeTimer;
  timeLeft=1000;
  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  cancelarOrden(){
    console.log("cancelarOrden");
    
  }
}
