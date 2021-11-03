import { Component, OnInit, Inject, ApplicationModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormsModule, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],

})

export class ContactusComponent implements OnInit {
  myDate = Date.now();
  data; address; phoneNumber; email: any
  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
    this.getdata()

  }
  getdata() {




    this.http.get(`http://127.0.0.1:3000/api/about/?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data = res;
      console.log(res)


      this.phoneNumber = this.data.data.phoneNumber
     
      this.email = this.data.data.email
      this.address = this.data.data.address
     


    });



  
}
}
