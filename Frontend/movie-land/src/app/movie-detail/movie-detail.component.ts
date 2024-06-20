import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movie, Comment } from '../api-interface';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit{
  like: number = 0
  test_movie: movie = {
    id: 50,
    title: "زنگ ها برای که به صدا در می آیند",
    genre: "Commedy",
    rating: "8.6",
    description: "ازم نخواه با تو بنومنم تو هیچی از من نمی دونی اگه بگم راز دلم رو تو هم کنارم نمی می نی ازم نخواه با تو بمونم هی هی تو هیچی از من نمی دونی اگه بگم راز دلم رو تو هم کنتارم نمی مونی تو هم کنارم نمی مونی",
    image_address: "assets/img/ac-image-6D1646204108bf.jpg"
  }

  constructor(
    private router:Router,
    private movieService:MovieService
  ){}

  ngOnInit(){
    console.log(this.router.url.split('/')[2])
  }

  incrementLike(): void{
    this.like++
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
