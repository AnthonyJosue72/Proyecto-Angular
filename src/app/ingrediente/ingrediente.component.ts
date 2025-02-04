import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-ingrediente',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,LogoutComponent],
  templateUrl: './ingrediente.component.html',
  styleUrl: './ingrediente.component.css'
})
export class IngredienteComponent {
  ingredientes: any[] = [];  // Aquí se almacenarán todos los ingredientes cargados
  ingrediente: any = {};     // Este es el ingrediente que se enviará al backend

  constructor(private http: HttpClient) {
    this.buscarIngrediente();
  }


  buscarIngrediente() {
    this.servicioBuscarIngrediente().subscribe(
      (u: any) => this.ingredientes = u
    );
  }

  servicioBuscarIngrediente(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/ingrediente/buscar"); 
  }

  guardarIngrediente() {
    console.log('Ingrediente a guardar:', this.ingrediente);  // Verifica si los datos están bien
    this.servicioGuardarIngrediente(this.ingrediente).subscribe(
      (response) => {
        console.log('Ingrediente guardado:', response);
        this.buscarIngrediente();
        this.ingrediente = {};  // Limpia el formulario después de guardar
      },
      (error) => console.error('Error al guardar ingrediente:', error)
    );
  }

  servicioGuardarIngrediente(ingrediente: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8080/ingrediente/guardar", ingrediente, httpOptions);
  }

  eliminarIngrediente(id: number) {
    this.servicioEliminarIngrediente(id).subscribe(
      (response) => {
        console.log('Ingrediente eliminado:', response);
        this.buscarIngrediente();
      },
      (error) => console.error('Error al eliminar ingrediente:', error)
    );
  }

  servicioEliminarIngrediente(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/ingrediente/borrar/${id}`);
  }
}

