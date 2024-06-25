import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/';
  private jwtService:JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    let formData = new FormData()
    formData.append('username',credentials.username)
    formData.append('password',credentials.password)
     return this.http.post(`${this.apiUrl}token`, formData).pipe(
      map((response:any)=>{
        return {
          access:response.access_token,
          tokenDetail:this.jwtService.decodeToken(response.access_token)
        }
      })
    );
  }
 
  signup(user: {user_name: string, email: string, phone_number: any, plain_text_password: string}): Observable<any> {
     return this.http.post(`${this.apiUrl}signup_user`, user);
  }
  
  getActivatedCode(id:number){
    return this.http.get(`${this.apiUrl}generate_code/${id}`)
  }
  activatedAccount(data:any){
    return this.http.put(`${this.apiUrl}activate_user?userid=${data.userid}&code=${data.code}`,data)
  }
}
