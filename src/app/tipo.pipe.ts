import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo',
  standalone: true
})
export class TipoPipe implements PipeTransform {

  transform(value: number, tipos: any[]): String {
    let t: any;
    for (t of tipos) {
      if (t.idtipoNoticia == value) {
        return t.descripcion
      }
    }
    return "No existe"
  }

}
