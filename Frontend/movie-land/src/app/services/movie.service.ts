import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  readonly base_api = 'http://localhost:3000/'
  constructor(
    private globalSevice:GlobalService,
    private http:HttpClient,

  ) { }

  addMovie(data:any){
    let coverLink = data.cover_link;
    delete data['cover_link']
    let headers = this.setHeaders(this.globalSevice.accessToken())
    return this.http.post(`${this.base_api}admin/addFilm`,data,{headers}).pipe(
      mergeMap((id:any)=>{
        if(coverLink && coverLink!=''){
          return this.addImageToMovie(id,coverLink).pipe(
            map((imagePath:any)=>{
            return {...data,cover_link:imagePath}
            })
          )
        }else return data
      })
    )
  }


  setHeaders(access:any){
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', `Bearer ${access}`)
    return headers
  }

  addImageToMovie(filmId:any,iamgeFile:any){
    let formData = new FormData()
    formData.append('file',iamgeFile)
    let headers = this.setHeaders(this.globalSevice.accessToken())
    return this.http.post(`${this.base_api}admin/uploadImage/${filmId}`,formData,{headers})
  }
  getAllMovies(){
    return this.http.get(`${this.base_api}home/all`)
  }
  
  getMovieById(id:number){
    return this.http.get(`${this.base_api}home/search-id/?film_id=${id}`)
  }

  deleteMovieByTitle(title:string){
    let headers = this.setHeaders(this.globalSevice.accessToken())
    return this.http.delete(`${this.base_api}admin/deleteFilm/?film_title=${title}`,{headers})
  }
}
