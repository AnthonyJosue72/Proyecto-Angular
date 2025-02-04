import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IngredientesPipe } from '../ingredientes.pipe';
import { LogoutComponent } from '../logout/logout.component';
import { EstadoPipe } from '../estado.pipe';
import { UsuarioPipe } from '../usuario.pipe';
import { PlatilloPipe } from '../platillo.pipe';
@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,IngredientesPipe,LogoutComponent,EstadoPipe,UsuarioPipe,PlatilloPipe],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  pedidos: any = [];
  estado: any = [];
  platillos: any = [];
  detalles: any = [];
  usuario: any = [];
  pedido: any = {
    detalles: []
  };

  constructor(private http: HttpClient) {
    this.buscarPedidos();
    this.buscarEstado();
    this.buscarUsuario();
    this.buscarDetalle();
    this.buscarPlatillo();
  }

  buscarPlatillo() {
    this.servicioBuscarPlatillo().subscribe(
      (p: any) => this.platillos = p
    );
  }

  servicioBuscarPlatillo(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/platillo/buscar");
  }

  buscarDetalle() {
    this.servicioBuscarDetalle().subscribe(
      (p: any) => this.detalles = p
    );
  }

  servicioBuscarDetalle(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/detalle/buscar");
  }

  buscarUsuario() {
    this.servicioBuscarUsuario().subscribe(
      (p: any) => this.usuario = p
    );
  }

  servicioBuscarUsuario(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/usuario/buscar");
  }

  buscarEstado() {
    this.servicioBuscarEstado().subscribe(
      (p: any) => this.estado = p
    );
  }

  servicioBuscarEstado(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/estado/buscar");
  }

  buscarPedidos() {
    this.servicioBuscarPedidos().subscribe(
      (p: any) => this.pedidos = p
    );
  }

  servicioBuscarPedidos(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/pedido/buscar");
  }

  actualizarEstado(pedido: any, idestado: number) {
    pedido.estadoIdestado = idestado;
    this.servicioGuardarEstado(pedido).subscribe(
      response => alert('Estado actualizado con éxito'),
      error => alert('Error al actualizar el estado')
    );
  }

  servicioGuardarEstado(pedido: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post("http://localhost:8080/pedido/guardar", pedido, httpOptions);
  }
}