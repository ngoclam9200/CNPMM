import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 data;role:any
  formGroup : FormGroup;
 
  constructor(private http:HttpClient,
    private router:Router) { }
  
  ngOnInit() {
    
    this.initForm();
    
  }
  login(data):Observable<any>{
    
    return this.http.post(`http://127.0.0.1:3000/api/user/login`, data);
  }
  initForm(){
    this.role=false
    this.formGroup= new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("",[ Validators.required])
    }); 

  }
    loginProces(){
      
    if (this.formGroup.valid){
      
      
      this.login(this.formGroup.value).subscribe((result) =>{
console.log(result)
        this.data=result
        this.role=this.data.data.role
        console.log(this.role);
       
          
         
            
   
           if(result.message=="Login Success!" && this.role=="ADMIN")
           {
            localStorage.setItem('userName',this.formGroup.controls['userName'].value)

            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data.token}) );
            localStorage.setItem('role',this.role );
            console.log(localStorage.getItem('currentUser'))

            this.router.navigate(['/alluser']);
           }
           if(result.message=="Login Success!" && this.role=="USER")
           {
            localStorage.setItem('userName',this.formGroup.controls['userName'].value)
            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data.token}) );
            console.log(localStorage.getItem('currentUser'))
            this.router.navigate(['/listcar']);
           }

            
          

      }, error=>{
        
        if( error.error.data == null)
        {
       
        alert("Sai tài khoản hoặc mật khẩu");
        }
        
      });
     
     
    }
    else alert("Bạn chưa nhập thông tin");
   
  
     
    
  }
  
 
Resetpassword(){

}
  

 
 
 

  

}
