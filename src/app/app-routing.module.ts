import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './componentes/dashboard/mostrar.component';
import { RegisterComponent} from './componentes/Usuarios/Register/register.component';
import { IndexComponent } from './componentes/index/index.component';
import { ForgotComponent } from './componentes/Usuarios/forgot/forgot.component';
import { LoginComponent} from './componentes/Usuarios/Login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'/index'},
  {
    path:'dashboard',
    component: MostrarComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/registro']))
  },
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegisterComponent},
  {path: 'forgot', component:ForgotComponent},
  {path: 'index', component:IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
