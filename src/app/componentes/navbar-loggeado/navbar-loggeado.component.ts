import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-loggeado',
  templateUrl: './navbar-loggeado.component.html',
  styleUrls: ['./navbar-loggeado.component.scss']
})
export class NavbarLoggeadoComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean= false;
  constructor() { }

  ngOnInit(): void {
  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
