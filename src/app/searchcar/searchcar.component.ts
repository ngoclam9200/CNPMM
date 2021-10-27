import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpRequest} from '@angular/common/http';
import {} from '@angular/common'

import{Router} from '@angular/router'
import {FormControl, FormsModule, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable,} from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-searchcar',
  templateUrl: './searchcar.component.html',
  styleUrls: ['./searchcar.component.css']
})
export class SearchcarComponent implements OnInit {
data:any
array:any=[]
dataCompany:any
arrayCompany:any=[]
nameCompany;nameCar:any
idcar:any
arrayid:any=[]
nocar:boolean=false
  constructor(private http:HttpClient, private router:Router) { }
isLogin:boolean
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')==null) this.isLogin=false
    else this.isLogin=true
    this.getcar()
    this.getlistcompanyname()
  }
  getlistcompanyname()
  {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(`http://127.0.0.1:3000/api/company/all`, { headers: headers }).subscribe(res => {
       console.log(res)
        this.dataCompany=res

        this.arrayCompany=this.dataCompany.data
        console.log(this.arrayCompany)
    
     
  
  
  
      });
  
  
    
  }
  getcar()
  {
  


    
    
   
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
if(localStorage.getItem('iscompany')=="true")
{


  this.nameCompany=localStorage.getItem('nameCompany');
  console.log(this.nameCompany)
      this.http.get(`http://127.0.0.1:3000/api/car/company?search=`+ this.nameCompany, { headers: headers }).subscribe(res => {
       console.log(res)
        this.data=res

        this.array=this.data.data
        console.log(this.array)
        if(this.array.length==0) this.nocar=true
    
    
  
      });
  
  
}
if(localStorage.getItem('iscar')=="true")
{


  this.nameCar=localStorage.getItem('nameCar');
  console.log(this.nameCar)
      this.http.get(`http://127.0.0.1:3000/api/car/car_name?search=`+ this.nameCar, { headers: headers }).subscribe(res => {
       console.log(res)
        this.data=res

        this.array=this.data.data
        console.log(this.array)
        if(this.array.length==0) this.nocar=true
    
    
  
      });
  
  
}


  }
  currentcar(id)
  { 
    console.log(id)
   
    localStorage.setItem('idcar',id)
    this.router.navigate(['/cardetail']);
   
  }
  searchcarbycompany(nameCompany)
{
  localStorage.setItem('nameCompany',nameCompany)
  localStorage.setItem('iscompany', 'true')
  localStorage.setItem('iscar', 'false')
  window.location.reload()
}


comparecar(id)
{ console.log(localStorage.getItem('arraycomparecar'))
  if(localStorage.getItem('arraycomparecar')==null || localStorage.getItem('arraycomparecar')=="")
  {
    localStorage.setItem('arraycomparecar', id);
    this.router.navigate(['/carcomparison']);
  }
  else
  { this.idcar=localStorage.getItem('arraycomparecar')
    if(this.idcar.length>96) 
    {
      Swal.fire({
        title: 'comparison list cannot be more than 4 cars ',
        text: "you need to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          
         
      
         
          this.router.navigate(['/carcomparison']);
      
          
        }
    
      })
    }
    else
    {
      
      var existing = localStorage.getItem('arraycomparecar');
      this.idcar=localStorage.getItem('arraycomparecar')
      var i=0
      var length=this.idcar //74
      var start=0
     var numberstring=Math.floor(length.length/24)
     
      while(i< numberstring)
      {  
       
        var t=this.idcar.indexOf(",")
        console.log(t)
        if(t==-1) this.arrayid.push(this.idcar)
        else this.arrayid.push(this.idcar.slice(start,t))
       
        this.idcar=this.idcar.slice(t+1,this.idcar.length)
        
       
        i++;
        console.log(this.arrayid)
     
      }
      for(let i=0; i<this.arrayid.length;i++)
      {
        if(this.arrayid[i]==id) 
        {
        Swal.fire({
          title: 'This vehicle already exists in the comparison list ',
          text: "Do you want to go to the comparison page?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            
           
        
           
            this.router.navigate(['/carcomparison']);
        
            
          }
      
        })
        
        return
      }
      }

      var data
   
      data = existing ? existing.split(',') : [];
   
   
     data.push(id);

    
   localStorage.setItem('arraycomparecar', data.toString());
   
  
   this.router.navigate(['/carcomparison']);
    }

   
  

}




  
}
}
