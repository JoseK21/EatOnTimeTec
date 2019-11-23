import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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


  jl_disable = false;
  subscribeTimer;
  timeLeft = 120;

  TIME_1 ;
  oberserableTimer() {
    const source = timer(1000, 100);
    this.TIME_1 = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer <= 0) {
        this.TIME_1.unsubscribe();
        this.jl_disable = true;
        this.oberserableBar();
      }
    });
  }

  TIME_2;
  subscribeBar;
  timeRight = 0;
  oberserableBar() {
    const source = timer(1000, 2500);
    this.TIME_2 = source.subscribe(val => {
      this.subscribeBar = this.timeRight + val;
      if (this.subscribeBar >= 100) {
        // this.subscribeBar.unsubscribe();
        this.TIME_2.unsubscribe();
        Swal.fire(
          'Notificación',
          'Orden Lista',
          'success'
        )
      }
    });
  }

  cancelarOrden() {
    console.log("cancelarOrden");

  }
}
