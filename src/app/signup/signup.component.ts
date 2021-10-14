import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormsModule, Validators} from '@angular/forms';

import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup : FormGroup;
  constructor(private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){

    this.formGroup= new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("",[ Validators.required]),
      confirmpassword: new FormControl("",[ Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      address: new FormControl("",[ Validators.required]),
      phoneNumber: new FormControl("",[ Validators.required])
    }); 

  }
  register(data):Observable<any>{
    console.log("I am server");
    return this.http.post(`http://127.0.0.1:3000/api/user/register`, data);
  }
  registerProces(){
      
    
      
    const password = this.formGroup.controls['password'].value;
    const confirmPassword = this.formGroup.controls['confirmpassword'].value;
   
   
   if(password != confirmPassword || password=="" || confirmPassword=="")
   {
    alert("Password not match");
     return;
   }
  
  
   else{
    if (this.formGroup.valid){
    this.register(this.formGroup.value).subscribe((result) =>{
   
      if(result)
       console.log( result);
       alert("Đăng kí thành công");
       this.router.navigate(['/signin']);
        
        
      

    }, error=>{
      
      if( error.error != "Dang ky that bai")
      {
      alert("Emailhoặc user name này đã được đăng kí rồi !!");
      }
    });

   
   
  }

  else alert("Bạn chưa nhập đầy đủ thông tin");

}

   
  
  }

}
