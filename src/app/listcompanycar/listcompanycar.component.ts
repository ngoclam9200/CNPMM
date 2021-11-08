import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'

import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-listcompanycar',
  templateUrl: './listcompanycar.component.html',
  styleUrls: ['./listcompanycar.component.css']
})
export class ListcompanycarComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }
  data: any
  array: any = []

  ngOnInit(): void {
    this.getcompany()
  }

  getcompany() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apicompany+`all`, { headers: headers }).subscribe(res => {
       this.data = res

      this.array = this.data.data
 




    });



  }
  searchcarbycompany(name) {
    localStorage.setItem('nameCompany', name)
    localStorage.setItem('iscompany', 'true')
    localStorage.setItem('iscar', 'false')
    this.router.navigate(['/searchcar']);

  }

}
