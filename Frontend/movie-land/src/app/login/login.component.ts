import { Component } from '@angular/core';
import { User } from '../api-interface';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = {
    phone_number: 0,
    email: '',
    user_name: '',
    plain_text_password: '',

  }
  constructor(
    private authServices: AuthService,
    private globalService:GlobalService,
    private router:Router
  ){}

  login(){
    this.authServices.login({username: this.user.user_name, password: this.user.plain_text_password}).subscribe(
      data => {
        this.globalService.setStorage('access',data.access)
        this.globalService.setStorage('detail',JSON.stringify(data.tokenDetail))
        this.router.navigate([''])
      },
      error => {
        window.alert('خطای رخ داده است')
      }
    )
  }
  
}
