import { NgModule } from '@angular/core';
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
<<<<<<< HEAD
=======
import { FooterComponent } from './componentes/footer/footer.component';
>>>>>>> 873679ea983a054702cb1770cc50af3dc730bc69


@NgModule({
  declarations: [
    AppComponent,
    MostrarComponent,
    RegisterComponent,
    LoginComponent,
    IndexComponent,
    ForgotComponent,
    FooterComponent,

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
  bootstrap: [AppComponent]
})
export class AppModule { }
