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
    phonenumber: 0,
    email: '',
    user_name: '',
    password: '',

  }
  constructor(private authServices: AuthService){}

  login(){
    this.authServices.login({user_name: this.user.user_name, email: this.user.email, phonenumber: this.user.phonenumber, plain_text_password: this.user.password}).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
