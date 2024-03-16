import { Component } from '@angular/core';
import { User } from '../api-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true

  user: User = {
    phonenumber: 0,
    password: ''
  }
  constructor(private authService: AuthService){}
  login(){
    this.authService.login({phonenumber: this.user.phonenumber, password: this.user.password}).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
