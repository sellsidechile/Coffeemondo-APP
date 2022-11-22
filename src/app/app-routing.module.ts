import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './componentes/dashboard/mostrar.component';
import { RegisterComponent} from './componentes/Usuarios/Register/register.component';
import { IndexComponent } from './componentes/index/index.component';
import { ForgotComponent } from './componentes/Usuarios/forgot/forgot.component';
import { LoginComponent} from './componentes/Usuarios/Login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ChartComponent } from './componentes/chart/chart.component';
import { StudioComponent} from './componentes/studio/studio.component';
import { ShopComponent} from './componentes/data-studio/shop/shop.component';
import { PlotsComponent} from './componentes/data-studio/plots/plots.component';
import { NlpComponent} from './componentes/data-studio/nlp/nlp.component';
import { MantenimientoComponent} from './componentes/data-studio/mantenimiento/mantenimiento.component';
import { CxComponent} from './componentes/data-studio/cx/cx.component';
import { VisionComponent} from './componentes/data-studio/vision/vision.component';
import { SocialComponent} from './componentes/data-studio/social/social.component';
import { AplicacionComponent} from './componentes/data-studio/aplicacion/aplicacion.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'/index'},
  {
    path:'dashboard',
    component: MostrarComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/index']))
  },
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegisterComponent},
  {path: 'forgot', component:ForgotComponent},
  {path: 'index', component:IndexComponent},
  {path: 'chart', component:ChartComponent},
  {path: 'studio', component:StudioComponent},
  {path: 'shop', component:ShopComponent},
  {path: 'plots', component:PlotsComponent},
  {path: 'social', component:SocialComponent},
  {path: 'nlp', component:NlpComponent},
  {path: 'app', component:AplicacionComponent},
  {path: 'mantenimiento', component:MantenimientoComponent},
  {path: 'cx', component:CxComponent},
  {path: 'vision', component:VisionComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
