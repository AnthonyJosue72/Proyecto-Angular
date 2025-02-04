import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detalle',
  standalone: true
})
export class DetallePipe implements PipeTransform {

  transform(value: number, detalle: any[], platillos: any[]): string {
    for (let t of detalle) {
      if (t.iddetalle_pedido == value) {
        const platillo = platillos.find(p => p.idplatillo == t.platilloIdplatillo);
        const nombrePlatillo = platillo ? platillo.descripcion : "Desconocido";
        return `Precio: ${t.precio}, Cantidad: ${t.cantidad}, Platillo: ${nombrePlatillo}`;
      }
    }
    return "No existen datos";
  }
}


