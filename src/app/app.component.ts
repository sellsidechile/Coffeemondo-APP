import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleApiService } from './services/google-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuth: boolean;
  menuStatus: boolean= true;
  @Input() sideNavStatus: boolean = true;
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor(private readonly google: GoogleApiService, private afAuth: AngularFireAuth,private router: Router){
    this.afAuth.user.subscribe(user => {
      this.isAuth = !!user;
      if(this.isAuth == true) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/index'])
      }
    });

  }
  title = 'angularcoffeemondo';


  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  
}
