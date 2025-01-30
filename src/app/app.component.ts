import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  fMoviesComponent } from "./movies/movies.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, fMoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies';
}
