import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IngredientesPipe } from '../ingredientes.pipe';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-platillo',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,IngredientesPipe,LogoutComponent],
  templateUrl: './platillo.component.html',
  styleUrl: './platillo.component.css'
})
export class PlatilloComponent {
  platillos: any = [];
  ingredientes: any = [];
  platillo: any = {
    ingredientes: []
  };

  constructor(private http: HttpClient) {
    this.buscarPlatillos();
    this.buscarIngredientes();
  }

  buscarPlatillos() {
    this.servicioBuscarPlatillos().subscribe(
      (p: any) => this.platillos = p
    );
  }

  buscarIngredientes() {
    this.servicioBuscarIngredientes().subscribe(
      (i: any) => this.ingredientes = i
    );
  }

  servicioBuscarPlatillos(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/platillo/buscar");
  }

  servicioBuscarIngredientes(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/ingrediente/buscar");
  }

  crearPlatillo() {
    let formularioValido: any = document.getElementById("PlatilloForm");

    if (formularioValido.reportValidity()) {
      this.servicioGuardar().subscribe(
        (p: any) => this.finalizarGuardar(p)
      );
    }
  }

  servicioGuardar() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      "http://localhost:8080/platillo/guardar",
      this.platillo,
      httpOptions
    );
  }

  finalizarGuardar(u: any) {
    this.platillo = { ingredientes: [] }; // Reinicia el objeto platillo
    this.buscarPlatillos();
    this.buscarIngredientes();
    alert("Platillo guardado!!");
  }

  agregarIngrediente() {
    this.platillo.ingredientes.push({});
  }

  eliminarPlatillo(id: number) {
    this.servicioEliminarPlatillo(id).subscribe(
      (response) => {
        console.log('Platillo eliminado:', response);
        this.buscarPlatillos();
      },
      (error) => console.error('Error al eliminar platillo:', error)
    );
  }

  servicioEliminarPlatillo(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/platillo/borrar/${id}`);
  }

  // Función para manejar la carga de la imagen y convertirla a Base64
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.platillo.foto = e.target.result; // Asigna la imagen en Base64 a platillo.foto
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
  }
}