import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
    constructor(){
      let usuario = localStorage.getItem("usuario");
      if(!usuario){
        location.href = "";
      }
    }
    logout(){
      localStorage.clear();
      location.href="";
    }
  }
