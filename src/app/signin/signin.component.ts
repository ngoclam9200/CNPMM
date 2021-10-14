import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormsModule, Validators} from '@angular/forms';
//import { from } from 'rxjs/observable/from';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  formGroup : FormGroup;
  role:boolean=false
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
        
        //console.log(result);
       
          
          if(result.message=="Login Success!")
          {
            
            //console.log(result.data);
            
            // localStorage.setItem('id', JSON.stringify({ id: result.data._id }));
          // console.log(result)
          
           if(result.message=="Login Success!")
           {
            localStorage.setItem('userName',this.formGroup.controls['userName'].value)
            localStorage.setItem('currentUser',JSON.stringify( {token:result.data}) );
            console.log(localStorage.getItem('currentUser'))
            this.router.navigate(['/profileuser']);
           }
           

            
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
  
 

  

 
 
 

  

}
