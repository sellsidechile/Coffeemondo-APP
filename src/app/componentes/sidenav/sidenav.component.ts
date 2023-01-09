import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean;

  list =[
    {
      number: '1',
      name: 'home',
      icon: 'fa-solid fa-house',
    },
    {
      number: '2',
      name: 'Analisis',
      icon: 'fa-solid fa-chart-line',
      link: 'dashboard',
    },
    {
      number: '1',
      name: 'Datos',
      icon: 'fa-solid fa-chart-pie',
      link: 'chart'
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
