import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,LogoutComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  irANoticias(){
  location.href= "noticia";
}
irUsuarios(){
  location.href= "Usuario";
}
irAIngrediente(){
  location.href= "ingrediente";
}
irAPlatillo(){
  location.href= "platillo";
}
irAPedido(){
  location.href= "pedido";
}
}

