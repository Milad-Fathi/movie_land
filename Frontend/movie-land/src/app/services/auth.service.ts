import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) { }

  login(credentials: {user_name: string, email: string, phonenumber: number, plain_text_password: string}): Observable<any> {
     return this.http.post(`${this.apiUrl}/token`, credentials);
  }
 
  signup(user: {user_name: string, email: string, phonenumber: number, plain_text_password: string}): Observable<any> {
     return this.http.post(`${this.apiUrl}/signup_user`, user);
  }
}
