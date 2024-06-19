import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movie } from '../api-interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  test_movie: movie = {
    id: 50,
    title: "زنگ ها برای که به صدا در می آیند",
    genre: "Commedy",
    rating: "8.6",
    description: "خیلی خنده داره هست هاهاها",
    image_address: "assets/img/ac-image-6D1646204108bf.jpg"
  }
  // movieId: string;
  // movieDetails: any;

  // constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.movieId = this.route.snapshot.paramMap.get('id');
  //   // Fetch movie details using this.movieId
  //   // Example: this.movieDetails = fetchMovieDetails(this.movieId);
  // }

}
