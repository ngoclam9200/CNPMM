import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  formGroupresetpass : FormGroup;
  constructor(private http: HttpClient, private router: Router) { }

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
      console.log(this.formGroupresetpass.value)
      this.reset(this.formGroupresetpass.value).subscribe((result) => {
        console.log(result)


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


    return this.http.post(`http://127.0.0.1:3000/api/user/reset_password`, data);
  }

}
