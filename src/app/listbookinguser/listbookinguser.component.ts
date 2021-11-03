import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-listbookinguser',
  templateUrl: './listbookinguser.component.html',
  styleUrls: ['./listbookinguser.component.css']
})

export class ListbookinguserComponent implements OnInit {
  array: any = []
  data; iduser: any
  arraydata: any = []
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.currentData()
  }
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/schedule/user`, { headers: headers }).subscribe(res => {
      console.log(JSON.stringify(res))
      this.data = res
      this.iduser = this.data.data._id
      this.array = this.data.data
      for (let i = 0; i < this.array.length; i++) {
        this.http.get(`http://127.0.0.1:3000/api/car/?getId=`+this.array[i].carId).subscribe(res => {
    
          this.data = res
   
      
        const today = new Date(this.array[i].time);
        today.toString();
        var date=today.toString();
        date=date.slice(0,21)
        console.log(today)
        this.arraydata.push({ "carName":this.data.data.carName, "Image": this.data.data.Image,"price":this.data.data.price, "time":date,"carId":this.data.data._id})

        console.log(this.arraydata)

        });
       
      }
     












    });


  }
  currentbooking(id)
  {
  localStorage.setItem('idcar',id)
  this.router.navigate(['/cardetail']);
  }
}
