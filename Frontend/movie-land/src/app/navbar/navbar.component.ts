import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLogIn = false
  constructor(
    private globalService:GlobalService,
    private Router:Router
  ){}


  ngOnInit(): void {
    this.Router.events.subscribe(
      (e:any)=>{
        this.isLogIn = this.globalService.getStorageItem('detail') ? true : false
        this.user()
      }
    )
    this.isLogIn = this.globalService.getStorageItem('detail') ? true : false
  }

  user(){
    if(this.isLogIn){
      return JSON.parse(this.globalService.getStorageItem('detail') as any)
    }
    return null
  }
  logOut(){
    console.log(1)
    this.globalService.removeStorage()
  }
}
