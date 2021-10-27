import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpRequest} from '@angular/common/http';
import {} from '@angular/common'

import{Router} from '@angular/router'
import {FormControl, FormsModule, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable,} from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listcompanycar',
  templateUrl: './listcompanycar.component.html',
  styleUrls: ['./listcompanycar.component.css']
})
export class ListcompanycarComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }
data:any
array:any=[]

  ngOnInit(): void {
    this.getcompany()
  }

  getcompany()
  {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(`http://127.0.0.1:3000/api/company/all`, { headers: headers }).subscribe(res => {
       console.log(res)
        this.data=res

        this.array=this.data.data
        console.log(this.array)
    
     
  
  
  
      });
  
  
    
  }
  searchcarbycompany(name)
  {
   localStorage.setItem('nameCompany',name)
   localStorage.setItem('iscompany', 'true')
   localStorage.setItem('iscar', 'false')
    this.router.navigate(['/searchcar']);
 
  }
 
}
