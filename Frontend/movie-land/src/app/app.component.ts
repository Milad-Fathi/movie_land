import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private router:Router,
    private globalService:GlobalService
  ){

  }
  ngOnInit(): void {
    if(!this.globalService.getStorageItem('access') && !this.globalService.getStorageItem('detail')){
      this.router.navigate(['/login'])
      this.globalService.removeStorage()
    }
  }
}
