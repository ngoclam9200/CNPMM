import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
arr:[]
  ngOnInit(): void {
    
    this.currentData()
  }
  currentData() {


    
    
   
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/user/user`, { headers: headers }).subscribe(data => {
      console.log(JSON.stringify(data))
      var jsonvalue = JSON.stringify(data)
      var valueFromJson  = JSON.parse(jsonvalue)
    //   this.formGroup = new FormGroup({
    //     TenKhachHang: new FormControl(valueFromJson.data.TenKhachHang),
    //     SoDienThoai: new FormControl(valueFromJson.data.SoDienThoai),
    //     Email: new FormControl(valueFromJson.data.Email),




    //   })










    });


  }

}
