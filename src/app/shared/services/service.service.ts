import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  ngOnInit() {
    this.remove_datas()
  }

  lista_users = [];
  lista_dishes = [];
  lista_gustos = [];


  list_new_dishes = [];
  add_new_dishes(new_dish) {
    console.log("New Dish Added");    
    this.list_new_dishes.push(new_dish);
  }
  get_list_new_dishes() {
    return this.list_new_dishes;
  }





  add_user(id) {
    this.lista_users.push(Number(id));
  }

  add_dish(name) {
    this.lista_dishes.push(name);
  }

  get_lista_users() {
    return this.lista_users;
  }
  get_lista_dishes() {
    return this.lista_dishes;
  }

  remove_datas() {
    this.lista_users = [];
    this.lista_dishes = [];
  }

  /* Gustos */
  set_preference(gustos) {
    this.lista_gustos = gustos
  }

  get_preference() {
    return this.lista_gustos;
  }
}
