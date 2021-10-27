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
  data:any
fullName;address;phoneNumber;email:any

formGroup;formGroupchangepass : FormGroup;

  ngOnInit(): void {
    
    this.currentData()
    this.initForm()
  }
  initForm(){

    this.formGroup= new FormGroup({
     
      fullName: new FormControl("", [Validators.required]),
      address: new FormControl("",[ Validators.required]),
      phoneNumber: new FormControl("",[ Validators.required]),
      email: new FormControl("", [Validators.required]),
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirmpassword: new FormControl("", [Validators.required]),
    }); 
    this.formGroupchangepass= new FormGroup({
     
      
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
    
    }); 

  }
  currentData() {


    
    
   
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/user/user`, { headers: headers }).subscribe(res => {
      console.log(JSON.stringify(res))
      this.data=res
     this.address=this.data.data.address
     this.fullName=this.data.data.fullName
     this.phoneNumber=this.data.data.phoneNumber
     this.email=this.data.data.email
      this.formGroup = new FormGroup({
       
       
        fullName: new FormControl(this.data.data.fullName),
        address: new FormControl(this.data.data.address),
        phoneNumber: new FormControl(this.data.data.phoneNumber),
        email: new FormControl(this.data.data.email),

      })
      










    });


  }
  UpdateUser()
  {
  this.currentData()
   
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.update(this.formGroup.value).subscribe((result) => {
        console.log(result)


        if (result)
          console.log(result);

       
        window.location.reload();
        alert("Update thành công");

      });

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");

  

  }
  update(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token);
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.put(`http://127.0.0.1:3000/api/user/user`, data, { headers: headers });
  }
  Changepassword(){
    if (this.formGroupchangepass.valid) {
      console.log(this.formGroupchangepass.value)
      this.changepw(this.formGroupchangepass.value).subscribe((result) => {
        console.log(result)


        if (result)
          console.log(result);

       
        window.location.reload();
        alert(" thành công");

      });

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");


  }
  changepw(data): Observable<any> {
   
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token);
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.put(`http://127.0.0.1:3000/api/user/change_password`, data, { headers: headers });
  }



  

   
 

}
