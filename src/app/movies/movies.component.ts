import { Imovie } from '../imovie';
import { GetPostsService } from './../get-posts.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class fMoviesComponent implements OnInit {
  dataMovies = inject(GetPostsService);
  baseImg: string = 'https://image.tmdb.org/t/p/w500';
  resData: Imovie[] = [];
  ngOnInit(): void {
    this.dataMovies.getPosts().subscribe({
      next: (data) => {
        this.resData = data.results;
      },
    });
  }
}
