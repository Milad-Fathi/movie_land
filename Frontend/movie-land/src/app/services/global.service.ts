import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  setStorage(key:any,value:any){
    localStorage.setItem(key,value)
  }
  getStorageItem(key:any){
    return localStorage.getItem(key)
  }
  removeStorage(){
    localStorage.removeItem('access')
    localStorage.removeItem('detail')
  }
  scrollToTop(){
    window.scrollTo(0,0)
  }
  userDetail(){
    return JSON.parse(this.getStorageItem('detail') as any)
  }
  accessToken(){
    return this.getStorageItem('access')
  }
  isLogIn():boolean{
    return this.getStorageItem('access') && this.getStorageItem('detail') ? true : false
  }
}
