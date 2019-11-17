import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  username: string;

password: string;

 

  login() : void {

    if(this.username == 'admin' && this.password == 'admin'){

    // this.router.navigate(["user"]);

    }else {

      alert("Invalid credentials");

    }

  }
}
