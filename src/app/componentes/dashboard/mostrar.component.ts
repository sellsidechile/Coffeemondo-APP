import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios.model';
import { Router } from '@angular/router';

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
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
}

}
