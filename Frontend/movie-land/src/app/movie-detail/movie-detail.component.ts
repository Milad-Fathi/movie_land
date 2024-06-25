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
  test_movie: any
  constructor(
    private router:Router,
    private movieService:MovieService
  ){}

  ngOnInit(){
    console.log(this.router.url.split('/')[2])
    this.movieService.getMovieById(+this.router.url.split('/')[2]).subscribe(
      (response)=>{
        console.log("test")
        console.log(response)
        this.test_movie = response
      }
    )
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
