import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormsModule, Validators} from '@angular/forms';
//import { from } from 'rxjs/observable/from';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {
  formGroupeditabout : FormGroup;
  data;address;phoneNumber;email;fullName;description;fax;nameCompany:any
  constructor(private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    
    this.getdata()
  }
Updateabout(){
  console.log(this.formGroupeditabout.value)
  if (this.formGroupeditabout.valid) {
    console.log(this.formGroupeditabout.value)
    this.update(this.formGroupeditabout.value).subscribe((result) => {
      console.log(result)


      if (result)
        console.log(result);

     
      window.location.reload();
      alert("Update thành công");

    });

  }

  else alert("Bạn chưa nhập đầy đủ thông tin");




}
getdata() {
  this.formGroupeditabout= new FormGroup({
     
    fax: new FormControl("", [Validators.required]),
    address: new FormControl("",[ Validators.required]),
    phoneNumber: new FormControl("",[ Validators.required]),
    email: new FormControl("", [Validators.required]),
    nameCompany: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
   
  }); 

 

  this.http.get(`http://127.0.0.1:3000/api/about/?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
    this.data=res;
    console.log(res)
  
  
   this.phoneNumber=this.data.data.phoneNumber
   this.fax=this.data.data.fax
   this.email=this.data.data.email
   this.address=this.data.data.address
   this.description=this.data.data.description
   this.nameCompany=this.data.data.nameCompany
   this.formGroupeditabout= new FormGroup({
     
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
  

    
    return this.http.post(`http://127.0.0.1:3000/api/about/update?aboutId=61654bb70e5cb46aa4f7d781`, data);
  }
}
