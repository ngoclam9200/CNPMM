import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'

import * as XLSX from 'xlsx';
import { ApiService } from 'src/services/api.service';
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
  constructor(private http: HttpClient, private router: Router,private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkRole()
    this.getuser()
  }
  getuser() {
    
  this.api.getuser().subscribe(res=>{
       this.data = res

      this.array = this.data.data
   

      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i].role == "USER")
          this.arrayalluser.push(this.array[i])
      }
  })
 
  

  }

}
