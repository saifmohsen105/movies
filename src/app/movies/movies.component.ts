import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsApi } from '../interface/details-api';
import { LoadingComponent } from "../loading/loading.component";
import { MoviesService } from '../services/movies.service';
import { FormsModule } from "@angular/forms"
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-movies',
  imports: [LoadingComponent, FormsModule, ButtonComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  moviesService = inject(MoviesService)
  movies: DetailsApi[] = [];
  router = inject(Router)
  isLoading: boolean = true;
  filteredMovies: any[] = [];
  search: string = "";
  currentPage: number = 1;
  scrollY: number = 0;
  timeOut: any = 0;
  // save a api because destroy
  apiSub!: Subscription;
  PLATFORM_ID = inject(PLATFORM_ID)
  ngOnInit() {
    this.getMovies(this.currentPage);
  }
  ngAfterViewChecked(): void {
    //  fixed scroll when click btm load more
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      window.scrollTo({ top: this.scrollY, behavior: "auto" });
    }
  }
  ngOnDestroy(): void {
    // check timer is exicting and end timer
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    // check api is exicting and end api
    if (this.apiSub) {
      this.apiSub.unsubscribe()
    }
  }
  // get movies by api
  getMovies(pages: number) {
    this.timeOut = setTimeout(() => {
      this.apiSub = this.moviesService.getTrendingMovies(pages).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.movies = res;
          this.currentPage++;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }, 500);
  }

  // sent api in url
  sentId(id: string | number) {
    this.router.navigate([`/details-card/${id}`])
  }
  // search of movies
  searchOnMovie() {
    this.filteredMovies = [];
    for (let i = 0; i < this.movies.length; i++) {
      const results = this.movies[i].results.filter((movie: any) =>
        movie.title.toLowerCase().includes(this.search.toLowerCase())
      );


      if (results.length > 0) {
        this.filteredMovies.push({ results });
      }
    }
  }
  // load another page
  loadMore() {
    this.scrollY = window.scrollY;
    this.isLoading = true;
    this.getMovies(this.currentPage)
    console.log('hello world');

  }



}
