import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {
  array: any = []
  data: any
  arrayalluser: any = []
  @ViewChild('TABLE') TABLE: ElementRef;
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AllUser' + today + '.xlsx');
  }
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/signin']);

    }
    else this.getuser()
  }
  getuser() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/user/all`, { headers: headers }).subscribe(res => {

      this.data = res

      this.array = this.data.data
      console.log(this.array)

      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i].role == "USER")
          this.arrayalluser.push(this.array[i])
      }
      console.log(this.arrayalluser)











    });




  }

}
