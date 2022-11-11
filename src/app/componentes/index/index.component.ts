import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var window:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  
  formModalLog:any;
  formModalReg:any;

  constructor() { }

  ngOnInit(): void {
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
