import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly base_api = 'http://localhost:3000/'
  constructor(
    private globalSevice:GlobalService,
    private http:HttpClient,

  ) { }

  getAllComments(){
    return this.http.get(`${this.base_api}user/all-comments`)
  }

  addComment(id:number ,data:any){
    let headers = this.setHeaders(this.globalSevice.accessToken())
    return this.http.post(`${this.base_api}user/addComment/?film_id=${id}`,data,{headers}).pipe(
      mergeMap((id:any)=>{
        return data
      })
    )
  }

  setHeaders(access:any){
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', `Bearer ${access}`)
    return headers
  }

}
