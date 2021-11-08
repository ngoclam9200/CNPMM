import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {
  formGroupeditabout: FormGroup;
  data; address; phoneNumber; email; fullName; description; fax; nameCompany: any
  constructor(private http: HttpClient,
    private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkRole()
     this.getdata()
  }
  Updateabout() {
     if (this.formGroupeditabout.valid) {
       this.update(this.formGroupeditabout.value).subscribe((result) => {
 

        if (result)
 

        window.location.reload();
        alert("Update thành công");

      });

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");




  }
  getdata() {
    this.formGroupeditabout = new FormGroup({

      fax: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      nameCompany: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),

    });



    this.http.get(this.api.apiabout+`?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data = res;
 

      this.phoneNumber = this.data.data.phoneNumber
      this.fax = this.data.data.fax
      this.email = this.data.data.email
      this.address = this.data.data.address
      this.description = this.data.data.description
      this.nameCompany = this.data.data.nameCompany
      this.formGroupeditabout = new FormGroup({

        fax: new FormControl(this.fax),
        address: new FormControl(this.address),
        phoneNumber: new FormControl(this.phoneNumber),
        email: new FormControl(this.email),
        nameCompany: new FormControl(this.nameCompany),
        description: new FormControl(this.description),

      });



    });
  }

  update(data): Observable<any> {



    return this.http.post(this.api.apiabout+`update?aboutId=61654bb70e5cb46aa4f7d781`, data);
  }
}
