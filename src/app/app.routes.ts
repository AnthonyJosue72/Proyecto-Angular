import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { PlatilloComponent } from './platillo/platillo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PedidoComponent } from './pedido/pedido.component';
export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'welcome',component:InicioComponent},
    {path: 'noticia', component: NoticiaComponent } ,
    {path : 'ingrediente', component: IngredienteComponent},
    {path : 'platillo', component: PlatilloComponent},
    {path : 'me', component: PerfilComponent},
    {path : 'Usuario', component:  UsuariosComponent},
    {path : 'pedido', component:  PedidoComponent}
];
