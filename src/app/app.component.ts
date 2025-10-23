import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Airflow Portal";

  constructor(private location: Location) {} 

  goBack(): void {
    this.location.back(); 
  }
}
