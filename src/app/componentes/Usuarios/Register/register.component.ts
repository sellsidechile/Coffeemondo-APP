import { Component, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formReg: FormGroup;

  constructor(
    public userService: UsuariosService,
    public router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then( () => {
        Swal.fire({
          text:"Se ha registrado de forma exitosa.",
          icon:"success"
        }).then( () => {
          this.router.navigate(['/login']);
        })
      })
      .catch( () => {
        Swal.fire({
          title:"Error al registrar los datos",
          text:"El formato de correo no es correcto o su contraseña no cumple los parametros.",
          icon:"error"
        })
      })
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then( () => {
        this.router.navigate(['/dashboard']);
      })
      .catch( () => {
        Swal.fire({
          text:"Error al registrarse con Google",
          icon:"error"
        })
      })
  }

  onFace() {
    this.userService.loginWithFacebook()
<<<<<<< HEAD
    .then( () => {
=======
    .then(response => {
      console.log(response);
>>>>>>> 873679ea983a054702cb1770cc50af3dc730bc69
      this.router.navigate(['/dashboard']);
    })
    .catch( () => {
      Swal.fire({
        text:"Error al registrarse con Facebook",
        icon:"error"
      })
    })
  }
}