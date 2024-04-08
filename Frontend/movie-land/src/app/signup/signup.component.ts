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
  is_code_sended = false
  is_validate = false

  timer: any; // Timer reference
  timerDuration = 2; // Timer duration in seconds
  remainingTime = 0; // Remaining time
  time_is_finished = false

  user: User = {
    phonenumber: '',
    password: ''
  }
  constructor(private authService: AuthService){}
  
  login(){
    this.is_code_sended = true
    this.startTimer()

    this.authService.login({phonenumber: this.user.phonenumber, password: this.user.password}).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
    
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

 // Add a method to handle the validation code submission
 submitValidationCode() {
    // Implement the logic to submit the validation code
    // For example, call a service method to validate the code
    console.log('Validation code submitted');
    this.stopTimer(); // Stop the timer when validation is submitted
 }

}

