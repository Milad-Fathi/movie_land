import { Component } from '@angular/core';
import { User } from '../api-interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true
  is_code_sended = false
  is_validate = false
  successMassageStatus = false

  timer: any; // Timer reference
  timerDuration = 5; // Timer duration in seconds
  remainingTime = 0; // Remaining time
  time_is_finished = false
  userId:any
  code:any;

  user: User = {
    phone_number: null,
    email: '',
    user_name: '',
    plain_text_password: '',

  }
  constructor(
    private authService: AuthService,
    private router:Router
  ){}
  
  signup(){
    this.startTimer()
    let u = this.user;
    if(u.email!='' && u.user_name!='' && u.plain_text_password!='' && u.phone_number){
      this.authService.signup({user_name: this.user.user_name, email: this.user.email, phone_number: this.user.phone_number?.toString(), plain_text_password: this.user.plain_text_password}).subscribe(
        data => {
          this.is_code_sended = true
          this.userId = data.id
          this.authService.getActivatedCode(this.userId).subscribe(
            (response)=>{
              console.log(response)
            },
            (error)=>{
              window.alert('لطفا فیلدهارا پر کنید')
            }
          )
        },
        error => {
          window.alert('خطایی رخ داده است')
        }
      )
    }else{
      window.alert('لطفا فیلدهارا پر کنید')
    }
    
  }

  startTimer() {
    this.remainingTime = this.timerDuration;
    this.timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.stopTimer();
        this.time_is_finished = true
      }
    }, 1000);
 }

 stopTimer() {
  clearInterval(this.timer);
 }

 submitValidationCode() {
    
    this.stopTimer(); 
    this.authService.activatedAccount({userid:this.userId,code:this.code}).subscribe(
      (response)=>{
        this.successMassageStatus = true
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 3000);
      },
      (error)=>{
        window.alert('لطفا فیلدهارا پر کنید')
      }
    )
 }

}

