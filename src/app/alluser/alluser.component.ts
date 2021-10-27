import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpRequest} from '@angular/common/http';
import {} from '@angular/common'

import{Router} from '@angular/router'
import {FormControl, FormsModule, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable,} from 'rxjs';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {
  array:any=[]
  data:any
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.getuser()
  }
  getuser()
  {
  


    
    
   
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
      headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(`http://127.0.0.1:3000/api/user/all`, { headers: headers }).subscribe(res => {
       
        this.data=res

        this.array=this.data.data
        console.log(this.array)
    
     
        
  
  
  
  
  
  
  
  
  
  
      });
  
  
    
  }

}
