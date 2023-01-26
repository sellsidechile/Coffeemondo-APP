import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
declare var window:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isAuth: boolean;
  isLogin: boolean;
  
  formModalLog:any;
  formModalReg:any;

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      this.isAuth = !!user;
      if(this.isAuth == true) {
        this.isLogin = true;
        this.router.navigate(['/dashboard'])
      }
      
    });
    this.formModalLog = new window.bootstrap.Modal(
      document.getElementById("modallogin"))
    this.formModalReg = new window.bootstrap.Modal(
      document.getElementById("modalregister"))
  }
  openModelLog(){
    this.formModalLog.show();
  }
  doSomethingLog(){
    this.formModalLog.hide()
  }
  openModelReg(){
    this.formModalReg.show();
  }
  doSomethingReg(){
    this.formModalReg.hide()
  }
}
