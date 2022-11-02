import {  Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { registerables } from 'chart.js'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  menuStatus: boolean= false;
  @Input() sideNavStatus: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  constructor( 
    private usuariosService : UsuariosService,
    private router : Router) { }

  ngOnInit(): void {
    Chart.register(...registerables); 
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
