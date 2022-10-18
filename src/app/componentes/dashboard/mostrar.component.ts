import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  Usuarios: Usuarios[]

  constructor(
    private usuariosService : UsuariosService,
    private router : Router
    ){ }

  ngOnInit(): void {

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
<<<<<<< HEAD
          this.router.navigate(['/index']);
=======
          this.router.navigate(['/login']);
>>>>>>> 873679ea983a054702cb1770cc50af3dc730bc69
        }
        
      })
    })
    .catch( () => {});
}

}
