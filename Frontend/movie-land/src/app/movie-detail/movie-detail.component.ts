import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  // movieId: string;
  // movieDetails: any;

  // constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.movieId = this.route.snapshot.paramMap.get('id');
  //   // Fetch movie details using this.movieId
  //   // Example: this.movieDetails = fetchMovieDetails(this.movieId);
  // }

}
