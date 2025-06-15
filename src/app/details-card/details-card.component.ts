import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { MoviesService } from './../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-card',
  imports: [LoadingComponent],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent implements OnInit {
  router = inject(ActivatedRoute)
  rou = inject(Router);
  MoviesService = inject(MoviesService)
  id: number = this.getId();
  movie!: any;
  isLoading: boolean = true;
  timeOut: any = 0;
  apiSub!: Subscription;
  ngOnInit(): void {
    this.getCard()
  }
  ngOnDestroy(): void {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    if (this.apiSub) {
      this.apiSub.unsubscribe()
    }
  }
  // get id in url
  getId(): number {
    return Number(this.router.snapshot.paramMap.get("id"));

  }
  getCard() {
    this.timeOut = setTimeout(() => {
      this.apiSub = this.MoviesService.getMovieDetails(this.getId()).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.movie = res
          console.log(this.movie);

        },
        error: (err) => {
          console.log(err);

        }
      })
    }, 500)
  }
  // go to page movies
  goBack() {
    this.rou.navigate(["/movies"])
  }

}
