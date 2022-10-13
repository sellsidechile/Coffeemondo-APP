import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UsuariosService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.formLogin.valid) {
      let errormsg = ""
      if (this.formLogin.get("password").hasError("required")) errormsg = "La contraseña es obligatoria"
      if (this.formLogin.get("email").hasError("email")) errormsg = "El formato del correo no es valido"
      if (this.formLogin.get("email").hasError("required")) errormsg = "El campo email es obligatorio"
      Swal.fire({
        text:errormsg,
        icon:"error"
      })
      return
    }
    Swal.fire("Cargando")
    Swal.showLoading()
    this.userService.login(this.formLogin.value)
      .then( () => {
        Swal.fire({
          text:"Se ha auntenticado de manera correcta",
          icon:"success"
        }).then( ()=> {
          this.router.navigate(['/dashboard']);
        })
      })
      .catch(err => {

        Swal.fire({
          title:"Error al autentificarse",
          icon:"error",
          text:"Su correo o contraseña no son validos"
        })
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then( () => {
        this.router.navigate(['/dashboard']);
      })
      .catch( () => {
        Swal.fire({
          text:"Error al ingresar con Google",
          icon:"error"
        })
      })
  }

  onFace(){
    this.userService.loginWithFacebook()
    .then( () => {
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      Swal.fire({
        text:"Error al ingresar con Facebook",
        icon:"error"
      })
    })
  }

}
