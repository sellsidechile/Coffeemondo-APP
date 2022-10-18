import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  formForgot: FormGroup;

  constructor(
    private userService : UsuariosService,
    private router: Router
  ) { 
    this.formForgot = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }

  onForgot(){
    if (!this.formForgot.valid) {
      let errormsg = ""
      if (this.formForgot.get("email").hasError("email")) errormsg = "El formato del correo no es valido"
      if (this.formForgot.get("email").hasError("required")) errormsg = "El campo email es obligatorio"
      Swal.fire({
        text:errormsg,
        icon:"error"
      })
      return
    }
    this.userService.forgot(this.formForgot.value)
    .then( () => {
      Swal.fire({
        text:"Se ha enviado un link de verificacion a su correo",
        icon:"success"
      })
    })
    .catch( () => {
      Swal.fire({
        title:"Error en el correo",
        icon:"error",
        text:"Su correo no esta regitrado en nuestra base de datos"
      })
    })
  }
}
