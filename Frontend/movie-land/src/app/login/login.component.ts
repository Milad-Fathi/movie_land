import { Component } from '@angular/core';
import { User } from '../api-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = {
    phonenumber: '',
    password: ''
  }

  constructor(private authServices: AuthService){}

  login(){
    this.authServices.login({phonenumber: this.user.phonenumber, password: this.user.password}).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
