import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-scheduleadmin',
  templateUrl: './scheduleadmin.component.html',
  styleUrls: ['./scheduleadmin.component.css']
})
export class ScheduleadminComponent implements OnInit {
  data: any
  array: any = []
  @ViewChild('TABLE') TABLE: ElementRef;
  title = 'Excel';


  myDate: any
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'BookingSheet' + today + '.xlsx');
  }
  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.getschedule()
  }
  getschedule() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/schedule/all`, { headers: headers }).subscribe(res => {
      console.log(res)
      this.data = res

      this.array = this.data.data
      console.log(this.array)



    });



  }
  deleteschedule(id) {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      width: 500,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes,delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://127.0.0.1:3000/api/schedule/?deleteId=` + id, { headers: headers }).subscribe(res => {
          console.log(res)
          window.location.reload()


        });





      }


    })

  }


}
