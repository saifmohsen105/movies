import { DetailsCardComponent } from './details-card/details-card.component';
import { MoviesComponent } from './movies/movies.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: "full" },
  { path: 'movies', component: MoviesComponent },
  { path: 'details-card/:id', component:DetailsCardComponent }
];
