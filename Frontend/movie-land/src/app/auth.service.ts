import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://api-address';

  constructor(private http: HttpClient) { }

  login(credentials: {phonenumber: number, password: string}): Observable<any> {
     return this.http.post(`${this.apiUrl}/login`, credentials);
  }
 
  signup(user: {phonenumber: number, password: string}): Observable<any> {
     return this.http.post(`${this.apiUrl}/signup`, user);
  }
}
