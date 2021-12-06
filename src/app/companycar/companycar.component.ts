import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-companycar',
  templateUrl: './companycar.component.html',
  styleUrls: ['./companycar.component.css']
})

export class CompanycarComponent implements OnInit {
  data: any
  array: any = []
  selectedFile: File;
  imagePreview: any = null;
  linkimage: String
  formGroup: FormGroup;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
     };
    reader.readAsDataURL(this.selectedFile);
  }
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkRole()
      this.getcompany()
      this.initForm()
    
    
  }
  cancle() {
    window.location.reload()
  }

  initForm() {

    this.formGroup = new FormGroup({
      carCompanyName: new FormControl("", [Validators.required]),
      logoCompany: new FormControl("", [Validators.required]),

    });

  }
  getcompany() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
   



    this.http.get(this.api.apicompany+`all`, { headers: headers }).subscribe(res => {
     
      this.data = res

      this.array = this.data.data
 




    });



  }


  create(data): Observable<any> {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.post(this.api.apicompany+`create`, data, { headers: headers });
  }
  createCompany() {





    const carCompanyName = this.formGroup.controls['carCompanyName'].value;
    if (carCompanyName != "" || this.imagePreview != null) {
      this.formGroup.setValue({
        logoCompany: this.imagePreview,
        carCompanyName: carCompanyName,
      });
    }
     if (this.formGroup.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,create it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.create(this.formGroup.value).subscribe((result) => {

            if (result) {
 
            }

          });
          Swal.fire(
            'Success!',
            '',
            'success'

          )
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }


      })





    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'Empty field....',
        text: 'Please fill in this form ',

      })
    }

  }
  deleteCompany(id) {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
 
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apicompany+`?deleteId=` + id, { headers: headers }).subscribe(res => {
 
        });
        Swal.fire(
          'Success!',
          '',
          'success'

        )
       
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      
      }


    })






  }

}
