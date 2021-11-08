import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],

})

export class ContactusComponent implements OnInit {
  myDate = Date.now();
  data; address; phoneNumber; email: any
  formGroup : FormGroup;
  constructor(private http:HttpClient, private api:ApiService) {

  }

  ngOnInit(): void {
    this.getdata()
    this.initForm()

  }
  initForm(){
    
    this.formGroup= new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("",[ Validators.required]),
      body: new FormControl("",[ Validators.required])
    }); 

  }
  getdata() {




    this.http.get(this.api.apiabout+`?about=61654bb70e5cb46aa4f7d781`).subscribe((res) => {
      this.data = res;
 

      this.phoneNumber = this.data.data.phoneNumber
     
      this.email = this.data.data.email
      this.address = this.data.data.address
     


    });



  
}
postdata(data):Observable<any>{
    
  return this.http.post(this.api.apiabout+`contact`, data);
}
postcontact()
{
  if (this.formGroup.valid){
      
      
    this.postdata(this.formGroup.value).subscribe((result) =>{
       this.initForm()
          
        alert("Send success!!")
      

    }, error=>{
      
      if( error.error.data == null)
      {
     
      alert("Send email error");
      }
      
    });
   
   
  }
  else alert("Bạn chưa nhập thông tin");
 

}
}
