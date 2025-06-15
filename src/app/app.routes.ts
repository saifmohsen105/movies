import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: "full" },
  { path: 'movies', loadComponent: () => import("./movies/movies.component").then(m => m.MoviesComponent) },
  { path: 'details-card/:id', loadComponent: () => import("./details-card/details-card.component").then(m => m.DetailsCardComponent) }
];
