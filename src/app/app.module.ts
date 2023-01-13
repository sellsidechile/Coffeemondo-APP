import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/index/index.component';
import { ForgotComponent } from './componentes/Usuarios/forgot/forgot.component';
import { MostrarComponent } from './componentes/dashboard/mostrar.component';
import { RegisterComponent } from './componentes/Usuarios/Register/register.component';
import { LoginComponent } from './componentes/Usuarios/Login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './componentes/footer/footer.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { NavbarLoggeadoComponent } from './componentes/navbar-loggeado/navbar-loggeado.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { StudioComponent } from './componentes/studio/studio.component';
import { ShopComponent } from './componentes/data-studio/shop/shop.component';
import { PlotsComponent } from './componentes/data-studio/plots/plots.component';
import { SocialComponent } from './componentes/data-studio/social/social.component';
import { NlpComponent } from './componentes/data-studio/nlp/nlp.component';
import { MantenimientoComponent } from './componentes/data-studio/mantenimiento/mantenimiento.component';
import { CxComponent } from './componentes/data-studio/cx/cx.component';
import { VisionComponent } from './componentes/data-studio/vision/vision.component';
import { AplicacionComponent} from './componentes/data-studio/aplicacion/aplicacion.component';
import { HlsComponent } from './hls/hls.component';
declare const videojs: any;



@NgModule({
  declarations: [
    AppComponent,
    MostrarComponent,
    RegisterComponent,
    LoginComponent,
    IndexComponent,
    ForgotComponent,
    FooterComponent,
    ChartComponent,
    NavbarLoggeadoComponent,
    SidenavComponent,
    StudioComponent,
    ShopComponent,
    PlotsComponent,
    SocialComponent,
    NlpComponent,
    MantenimientoComponent,
    CxComponent,
    VisionComponent,
    AplicacionComponent,
    HlsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
