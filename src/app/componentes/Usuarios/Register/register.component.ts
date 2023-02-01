import { Component, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isAuth: boolean;
  isLogin: boolean;
  
  formReg: FormGroup;
  visible: boolean=true;
  changetype: boolean=true;


  constructor(
    public userService: UsuariosService,
    public router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      this.isAuth = !!user;
      if(this.isAuth == true) {
        this.isLogin = true;
        this.router.navigate(['/dashboard'])
      }
      
    });
    
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then( () => {
        Swal.fire({
          text:"Se ha registrado de forma exitosa.",
          icon:"success"
        }).then( () => {
          this.router.navigate(['/index']);
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
    .then(response => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
    .catch( () => {
      Swal.fire({
        text:"Error al registrarse con Facebook",
        icon:"error"
      })
    })
  }
  myPassword() {
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
}