import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormsModule, Validators} from '@angular/forms';
//import { from } from 'rxjs/observable/from';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
data: any;
isadmin=false
nameCompany;phoneNumber;fax;description;address;email:any;
  constructor(private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.getdata()
    
   
  }
  getdata() {

    let headers = new HttpHeaders();
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
   // var token = currentUser.token; // your token

    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', token);

    this.http.get(`http://127.0.0.1:3000/api/about/?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data=res;
      console.log(res)
      console.log(this.data.data.nameCompany)
     this.nameCompany=this.data.data.nameCompany
     this.phoneNumber=this.data.data.phoneNumber
     this.fax=this.data.data.fax
     this.email=this.data.data.email
     this.address=this.data.data.address
     this.description=this.data.data.description
     if(localStorage.getItem('role')=="ADMIN")
     {
       this.isadmin=true
     }
      // this.array = Object.entries(res)
      // this.array = Object.values(this.array[0][1])
      // console.log(this.array);
      // return this.array;

    });
  }
  

}
