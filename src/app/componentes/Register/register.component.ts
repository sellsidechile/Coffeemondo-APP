import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';


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
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => console.log(error))
  }

  onFace(){
    this.userService.loginWithFacebook()
    .then(response => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
    .catch(error => console.log(error))
  }

}
