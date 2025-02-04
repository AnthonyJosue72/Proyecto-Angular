import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IngredientesPipe } from '../ingredientes.pipe';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-tipo-noticias',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,IngredientesPipe,LogoutComponent],
  templateUrl: './tipo-noticias.component.html',
  styleUrl: './tipo-noticias.component.css'
})
export class TipoNoticiasComponent {

}
