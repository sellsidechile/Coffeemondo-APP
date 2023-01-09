import { Component } from '@angular/core';
import { GoogleApiService } from './services/google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly google: GoogleApiService){}
  title = 'angularcoffeemondo';

}
