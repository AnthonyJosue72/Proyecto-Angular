import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,LogoutComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
    usuarios: any = [];
    createUsuario:any = {
      
    };
  
    constructor(private http:HttpClient){
      this.buscarUsuarios();
    }   
  
    buscarUsuarios(){
      this.servicioBuscarUsuarios().subscribe(
        (u:any) => this.usuarios = u
      )
    }
    servicioBuscarUsuarios():Observable<any>{
      return this.http.get<any>("http://localhost:8080/usuario/buscar");
    }
  
    
}
