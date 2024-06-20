import { Component, OnInit } from '@angular/core';
import { movie } from '../api-interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  movies: movie[] = []
  constructor(
    private MovieService:MovieService
  ){}

  ngOnInit(): void {
    this.MovieService.getAllMovies().subscribe((res:any)=>{this.movies = res}) 
  }

  scrollTop(){
    window.scrollTo(0,0)
  }
}
