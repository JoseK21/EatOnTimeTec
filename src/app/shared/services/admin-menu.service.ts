import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {

  lista_amigos = [];
  lista_platillos = [];

  constructor() { }

  ngOnInit() {
    this.remove_datas()
   }


  add_amigo(id) {
    this.lista_amigos.push(id);
  }

  add_platillo(name) {
    this.lista_platillos.push(name);
  }

  get_lista_amigos() {
    return this.lista_amigos;
  }
  get_lista_platillos() {
    return this.lista_platillos;
  }

  remove_datas(){
    this.lista_amigos = [];
    this.lista_platillos = [];
  }

}
