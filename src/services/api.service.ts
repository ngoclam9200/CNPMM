import { Injectable } from '@angular/core';

import {  HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  array: any = []
  data: any
  arrayalluser: any = []
  constructor(private http:HttpClient, private router:Router) { }
 
 
  apiabout="https://carshop985.herokuapp.com/api/about/"
  apiuser="https://carshop985.herokuapp.com/api/user/"
  apicar="https://carshop985.herokuapp.com/api/car/"
  apicompany="https://carshop985.herokuapp.com/api/company/"
  apischedule="https://carshop985.herokuapp.com/api/schedule/"


  getuser() {
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiuser+`all`, { headers: headers })
  }
  checkRole()
  {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/signin']);
      return

    }
     if(localStorage.getItem('role')==null)
    this.router.navigate(['/notfoundpage']);
  }
}
