import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-listbookinguser',
  templateUrl: './listbookinguser.component.html',
  styleUrls: ['./listbookinguser.component.css']
})

export class ListbookinguserComponent implements OnInit {
  array: any = []
  data; iduser: any
  arraydata: any = []
  nocar=true
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.currentData()
  }
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apischedule+`user`, { headers: headers }).subscribe(res => {
       this.data = res
      this.iduser = this.data.data._id
      this.array = this.data.data
      if(this.array.length==0) this.nocar=true
      else{
        this.nocar=false

      
      for (let i = 0; i < this.array.length; i++) {
        this.http.get(this.api.apicar+`?getId=`+this.array[i].carId).subscribe(res => {
    
          this.data = res
   
      
        const today = new Date(this.array[i].time);
        today.toString();
        var date=today.toString();
        date=date.slice(0,21)
         this.arraydata.push({ "carName":this.data.data.carName, "Image": this.data.data.Image,"price":this.data.data.price, "time":date,"carId":this.data.data._id})

 
        });
       
      }
    }
     












    });


  }
  currentbooking(id)
  {
  localStorage.setItem('idcar',id)
  this.router.navigate(['/cardetail']);
  }
}
