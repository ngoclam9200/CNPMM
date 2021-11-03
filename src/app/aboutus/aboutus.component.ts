import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


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
    private router: Router) { }

  ngOnInit(): void {
    this.getdata()


  }
  getdata() {




    this.http.get(`http://127.0.0.1:3000/api/about/?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data = res;
      console.log(res)
      console.log(this.data.data.nameCompany)
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
