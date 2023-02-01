import { Component, Input, OnInit,Renderer2 } from '@angular/core';
import { navbarData } from './nav-data';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  navData= navbarData ;
  constructor(private usuariosService : UsuariosService,
    private router : Router, private renderer: Renderer2) { 

  }

  ngOnInit(): void {
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void{
    this.collapsed = false;
  }

  onClick(){
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
            this.usuariosService.logout()
            this.router.navigate(['/index']);
            //recargar la pagina
            window.location.reload();
          } else {
            this.router.navigate(['/dashboard']);
          }
          
        })
      }
  
  }


