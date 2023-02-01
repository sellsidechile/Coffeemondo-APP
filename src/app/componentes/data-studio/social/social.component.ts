import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  isAuth: boolean;
  isLogin: boolean;
  Usuarios: Usuarios[]
  menuStatus: boolean= true;
  @Input() sideNavStatus: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();


  constructor(
    private usuariosService : UsuariosService,
    private router : Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      this.isAuth = !!user;
      if(this.isAuth == true) {
        this.isLogin = true;
        this.router.navigate(['/social'])
      } else {
        this.isLogin = false;
        this.router.navigate(['/index'])
      }
      
    });
    document.getElementsByClassName('modal-backdrop')[0].classList.remove('modal-backdrop')

  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  onClick(){
    this.usuariosService.logout()
      .then(()=>{
        Swal.fire({
          title:"¿Estas seguro?",
          text:"Si cierra sesion va a tener que volver a identificarse.",
          icon:"warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, estoy seguro."
        }).then( (result)=> {
          if (result.isConfirmed) {
            this.router.navigate(['/index']);
          }
          
        })
      })
      .catch( () => {});
  }
}
