import { Component, OnInit, Inject, ApplicationModule} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpRequest} from '@angular/common/http';
import {} from '@angular/common'

import{Router} from '@angular/router'
import {FormBuilder, FormControl, FormsModule, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable,} from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listcar',
  templateUrl: './listcar.component.html',
  styleUrls: ['./listcar.component.css'],
})
export class ListcarComponent implements OnInit {
  array:any=[]
  data:any
  dataCompany:any
  arrayCompany:any=[]
  formGroupSearch:FormGroup
arraycomparecar:any=[]
isLogin:boolean
idcar:any
arrayid:any=[]
  constructor(private http:HttpClient, private router:Router , private formBuider:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')==null) this.isLogin=false
    else this.isLogin=true
    this.getcar()
    this.getlistcompanyname()
    this.formGroupSearch=this.formBuider.group(
      {
        textSearch : new FormControl("", [Validators.required]),
      }
    )
  }
  getcar()
  {
  


    
    
   
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(`http://127.0.0.1:3000/api/car/all`, { headers: headers }).subscribe(res => {
       console.log(res)
        this.data=res

        this.array=this.data.data
        console.log(this.array)
    
    
  
      });
  
  
    
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
currentcar(id)
  { 
    console.log(id)
   
    localStorage.setItem('idcar',id)
    this.router.navigate(['/cardetail']);
   
  }
searchcar()
{
  localStorage.setItem('iscompany', 'false')
  localStorage.setItem('iscar', 'true')
 
  localStorage.setItem('nameCar', this.formGroupSearch.controls['textSearch'].value )
  this.router.navigate(['./searchcar'])
}
searchcarbycompany(nameCompany)
{
  localStorage.setItem('nameCompany',nameCompany)
  localStorage.setItem('iscompany', 'true')
  localStorage.setItem('iscar', 'false')
   this.router.navigate(['/searchcar']);
}

// comparecar(id)
// { console.log(localStorage.getItem('arraycomparecar'))
//   if(localStorage.getItem('arraycomparecar')==null)
//   {
//     localStorage.setItem('arraycomparecar', id);
//     this.router.navigate(['/carcomparison']);
//   }
//   else
//   { this.idcar=localStorage.getItem('arraycomparecar')
//     if(this.idcar.length>96) 
//     {
//       alert('comparison list cannot be more than 4 cars , you need to delete  ')
//       this.router.navigate(['/carcomparison']);
//     }
//     else
//     {
      
//       var existing = localStorage.getItem('arraycomparecar');
//       this.idcar=localStorage.getItem('arraycomparecar')
//       var i=0
//       var length=this.idcar //74
//       var start=0
//      var numberstring=Math.floor(length.length/24)
     
//       while(i< numberstring)
//       {  
       
//         var t=this.idcar.indexOf(",")
        
//         if(t==-1) this.arrayid.push(this.idcar)
//         else this.arrayid.push(this.idcar.slice(start,t))
       
//         this.idcar=this.idcar.slice(t+1,this.idcar.length)
        
       
//         i++;
//         console.log(this.arrayid)
     
//       }
//       for(let i=0; i<this.arrayid.length;i++)
//       {
//         if(this.arrayid[i]==id) 
//         Swal.fire({
//           title: 'This vehicle already exists in the comparison list ',
//           text: "Do you want to go to the comparison page?",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes'
//         }).then((result) => {
//           if (result.isConfirmed) {
            
           
        
           
//             this.router.navigate(['/carcomparison']);
        
            
//           }
      
//         })
        
//         return

//       }

//       var data
   
//       data = existing ? existing.split(',') : [];
   
   
//      data.push(id);

    
//    localStorage.setItem('arraycomparecar', data.toString());
   
  
//    this.router.navigate(['/carcomparison']);
//     }

   
  

// }




  
 
  
// }

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
