import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  formGroupresetpass : FormGroup;
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){

    this.formGroupresetpass= new FormGroup({
     
      
      email: new FormControl("", [Validators.required]),
     
    }); 
    

  }
  Resetpassword(){
    if (this.formGroupresetpass.valid) {
       this.reset(this.formGroupresetpass.value).subscribe((result) => {
 

        if (result)
         

       
       
        alert("Checkmail to recive password");
        this.router.navigate(['/signin']);

      });

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");

  


  }
  reset(data){
    let headers = new HttpHeaders();
  
    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.post(this.api.apiuser+`reset_password`, data);
  }

}
