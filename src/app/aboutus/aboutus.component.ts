import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  data: any;
  isadmin = false
  nameCompany; phoneNumber; fax; description; address; email: any;
  constructor(private http: HttpClient,
    private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.getdata()


  }
  getdata() {
    this.http.get( this.api.apiabout+`?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data = res;
     
      this.nameCompany = this.data.data.nameCompany
      this.phoneNumber = this.data.data.phoneNumber
      this.fax = this.data.data.fax
      this.email = this.data.data.email
      this.address = this.data.data.address
      this.description = this.data.data.description
      if (localStorage.getItem('role') == "ADMIN") {
        this.isadmin = true
      }


    });
  }


}
