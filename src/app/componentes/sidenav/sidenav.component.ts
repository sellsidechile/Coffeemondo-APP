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
      number: '3',
      name: 'Datos',
      icon: 'fa-solid fa-chart-pie',
      link: 'chart'
    },
    {
      number: '4',
      name: 'Studio',
      icon: 'fa-solid fa-ranking-star',
      link: 'studio'
    },
    {
      number: '5',
      name: 'Shop',
      icon: 'fa-brands fa-shopify',
      link: 'shop'
    },
    {
      number: '6',
      name: 'Plots',
      icon: 'fa-solid fa-compass-drafting',
      link: 'plots'
    },
    {
      number: '7',
      name: 'Social',
      icon: 'fa-regular fa-thumbs-up',
      link: 'social'
    },
    {
      number: '8',
      name: 'NLP',
      icon: 'fa-solid fa-ranking-star',
      link: 'nlp'
    },
    {
      number: '9',
      name: 'Mantenimiento',
      icon: 'fa-solid fa-screwdriver-wrench',
      link: 'mantenimiento'
    },
    {
      number: '10',
      name: 'App',
      icon: 'fa-solid fa-mobile-screen-button',
      link: 'app'
    },
    {
      number: '11',
      name: 'CX',
      icon: 'fa-solid fa-ranking-star',
      link: 'cx'
    },
    {
      number: '12',
      name: 'Vision',
      icon: 'fa-regular fa-eye',
      link: 'vision'
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
