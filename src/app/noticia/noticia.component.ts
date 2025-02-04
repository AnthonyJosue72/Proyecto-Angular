import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { TipoPipe } from '../tipo.pipe';
@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,LogoutComponent,TipoPipe],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  noticias: any = [];
  tipos: any = [];
  noticia: any = {
    tipos: []
  };

  constructor(private http: HttpClient) {
    this.buscarNoticias();
    this.buscarTipoNoticia();
  }

  // Buscar todas las noticias
  buscarNoticias() {
    this.servicioBuscarNoticias().subscribe(
      (n: any) => this.noticias = n
    );
  }

  // Buscar todos los tipos de noticias
  buscarTipoNoticia() {
    this.servicioBuscarTipoNoticia().subscribe(
      (t: any) => this.tipos = t
    );
  }

  servicioBuscarNoticias(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/noticia/buscar");
  }

  servicioBuscarTipoNoticia(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/tipo/buscar");
  }

  // Crear o actualizar noticia
  guardarNoticia() {
    let formularioValido: any = document.getElementById("createForm");

    if (formularioValido.reportValidity()) {
      this.servicioGuardarNoticia().subscribe(
        (n: any) => this.finalizarGuardar(n)
      );
    }
  }

  servicioGuardarNoticia(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      "http://localhost:8080/noticia/guardar",
      this.noticia,
      httpOptions
    );
  }

  finalizarGuardar(response: any) {
    this.noticia = { tipos: [] }; // Reinicia el objeto noticia
    this.buscarNoticias();
    alert("Noticia guardada o actualizada!");
  }

  // Agregar un nuevo tipo de noticia
  agregarTipo() {
    this.noticia.tipos.push({});
  }

  // Eliminar una noticia
  eliminarNoticia(id: number) {
    this.servicioEliminarNoticia(id).subscribe(
      (response) => {
        console.log('Noticia eliminada:', response);
        this.buscarNoticias();
      },
      (error) => console.error('Error al eliminar noticia:', error)
    );
  }

  servicioEliminarNoticia(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/noticia/borrar/${id}`);
  }

  // Manejar la carga de la imagen y convertirla a Base64
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.noticia.foto = e.target.result; // Asigna la imagen en Base64 a noticia.foto
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
  }
}