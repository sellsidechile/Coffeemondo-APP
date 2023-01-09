import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-loggeado',
  templateUrl: './navbar-loggeado.component.html',
  styleUrls: ['./navbar-loggeado.component.scss']
})
export class NavbarLoggeadoComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean= false;
  constructor(
    private usuariosService : UsuariosService,
    private router : Router
  ) { }

  ngOnInit(): void {
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
