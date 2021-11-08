import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-scheduleuser',
  templateUrl: './scheduleuser.component.html',
  styleUrls: ['./scheduleuser.component.css']
})
export class ScheduleuserComponent implements OnInit {
  data: any
  fullName; address; phoneNumber; email: any

  myDate: Date
  today: number = Date.now();
  formGroup: FormGroup;
  pipe = new DatePipe('en-US');
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private api:ApiService) {

  }

  ngOnInit(): void {


 

    this.formGroup = this.formBuilder.group(
      {
        _idUser: new FormControl("", [Validators.required]),
        userName: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required]),
        status: new FormControl("", [Validators.required]),
        carName: new FormControl("", [Validators.required]),
        carId: new FormControl("", [Validators.required]),
        time: new FormControl("", [Validators.required]),

      }
    )

    this.currentDataUser()
  }

  currentDataUser() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiuser+`user`, { headers: headers }).subscribe(res => {
       this.data = res
      this.address = this.data.data.address
      this.fullName = this.data.data.fullName
      this.phoneNumber = this.data.data.phoneNumber
      this.email = this.data.data.email

      this.formGroup = this.formBuilder.group(
        {
          _idUser: new FormControl(this.data.data._id, [Validators.required]),
          userName: new FormControl(this.data.data.userName, [Validators.required]),
          phoneNumber: new FormControl(this.phoneNumber, [Validators.required]),
          email: new FormControl(this.data.data.email, [Validators.required]),
          status: new FormControl("", [Validators.required]),
          carName: new FormControl(localStorage.getItem('namecar'), [Validators.required]),
          carId: new FormControl(localStorage.getItem('idcar'), [Validators.required]),
          time: new FormControl("", [Validators.required]),

        }
      )
 










    });


  }
  booking() {

    this.Createschedule()
  }

  create(data): Observable<any> {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.post(this.api.apischedule+`create`, data, { headers: headers });
  }
  Createschedule() {







 
    if (this.formGroup.controls['time'].value != "") {
      Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        width: 500,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes,booking it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.create(this.formGroup.value).subscribe((result) => {

            if (result) {
               this.router.navigate(['/listcar'])
              localStorage.removeItem('idcar')
              localStorage.removeItem('namecar')

            }


          });




        }


      })





    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'Empty field....',
        text: 'Please fill date in this form ',

      })


    }

  }
}
