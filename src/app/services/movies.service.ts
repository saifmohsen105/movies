import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { DetailsApi } from '../interface/details-api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = '74af77428341ef01d7d87e988efd2647';
  private baseUrl = 'https://api.themoviedb.org/3';
  http = inject(HttpClient)
  response: any[] = [];
  getTrendingMovies(pages: number): Observable<any> {
    const requests = [];
    for (let i = 1; i <= pages; i++) {
      requests.push(
        this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&page=${i}`) // بدون مسافة بعد page=
      );
    }
    return forkJoin(requests);
  }


  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  getMovieDetails(id: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
}


