import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/api-interface';
import { GlobalService } from 'src/app/services/global.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit{
  movies: movie[] = []
  isCanAccess = false

  value: any = {
    id: null,
    cover_link: null,
    title: null,
    genre: null,
    rating: null,
    description: null,

  }

  constructor(
    private globalService:GlobalService,
    private MovieService:MovieService
  ){}

  ngOnInit(): void {
  this.isCanAccess = this.globalService.isLogIn() && this.globalService.userDetail().role=='admin'
  this.MovieService.getAllMovies().subscribe((res:any)=>{this.movies = res})
  }

  addMovie(){
    this.MovieService.addMovie(this.value).subscribe(
      (response:any)=>{
        this.globalService.scrollToTop()
        this.value = {cover_link:false, title:false, id:null, genre:null, rating:null,description:null}
        this.MovieService.getAllMovies().subscribe((res:any)=>{this.movies = res})
      },(err:any)=>{
        window.alert('خطایی رخ داده است')
      }
    )
  }
  checkImage(e:any){
    this.value.cover_link = e.target.files[0]
  }
}
