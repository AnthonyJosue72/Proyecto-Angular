import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [LogoutComponent,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario:any;
  constructor(private http: HttpClient){
    let t:any = localStorage.getItem("usuario");
    this.usuario = JSON.parse(t);
  }
  cambiarcontrasenia() {
    if (this.usuario.password && this.usuario.idusuario) {
      this.servicioGuardar().subscribe(
        response => {
          alert('Contraseña actualizada con éxito');
        }
      );
    } 
  } 
  servicioGuardar(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      'http://localhost:8080/usuario/guardar',
      {
        idusuario: this.usuario.idusuario,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        nit: this.usuario.nit,
        correo: this.usuario.correo,
        password: this.usuario.password,
        fechaRegistro: this.usuario.fechaRegistro
      },
      httpOptions
    );
  }
}