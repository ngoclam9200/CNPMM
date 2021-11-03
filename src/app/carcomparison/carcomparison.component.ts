import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {} from '@angular/common'

import{Router} from '@angular/router'

@Component({
  selector: 'app-carcomparison',
  templateUrl: './carcomparison.component.html',
  styleUrls: ['./carcomparison.component.css']
})
export class CarcomparisonComponent implements OnInit {
data:any
idcar:any
arrayid:any=[]
arrayiddelete:any=[]
array:any=[]
nocarcompare:boolean
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.currentcar()
   
   
  }
  currentcar()
  { 
    this.idcar=localStorage.getItem('arraycomparecar')
    console.log(this.idcar)
    if(this.idcar=="" || this.idcar==null) this.nocarcompare=true
    else this.nocarcompare=false
    console.log(this.nocarcompare)
    if(this.idcar!=null)
    {
      if(this.idcar.length==24) 
   
   this.arrayid.push(this.idcar)
   else{
    var i=0
    var length=this.idcar //74
    var start=0
   var numberstring=Math.floor(length.length/24)
    // this.arrayid.push(this.idcar.slice(0,24))
    
    while(i< numberstring)
    {  
      //if(i!=0) start=start+1
      var t=this.idcar.indexOf(",")
      
      if(t==-1) this.arrayid.push(this.idcar)
      else this.arrayid.push(this.idcar.slice(start,t))
     
      this.idcar=this.idcar.slice(t+1,this.idcar.length)
      
     
      i++;
      console.log(this.arrayid)

    }

   }
  
    
   
      let headers = new HttpHeaders();
      
    
  
  
  for(let i=0; i<this.arrayid.length;i++)
  {
      this.http.get(`http://127.0.0.1:3000/api/car/?getId=`+ this.arrayid[i], { headers: headers }).subscribe(res => {
       console.log(res)
       this.data=res
       this.array.push(this.data.data)
   

       console.log(this.array)
  
      });
  
  
    }

    }
   
  }


  deletecomparecar(id)
  {
    this.idcar=localStorage.getItem('arraycomparecar')
    
    var i=0
    var length=this.idcar.length //74
    
    var start=0
   var numberstring=Math.floor(length/24)

    // this.arrayid.push(this.idcar.slice(0,24))
    
    while(i< numberstring)
    {  
      //if(i!=0) start=start+1
      var t=this.idcar.indexOf(",")
      
      if(t==-1) this.arrayiddelete.push(this.idcar)
      else this.arrayiddelete.push(this.idcar.slice(start,t))
     
      this.idcar=this.idcar.slice(t+1,this.idcar.length)
      
     
      i++;
     

    }
    const index = this.arrayiddelete.indexOf(id);
if (index > -1) {
  this.arrayiddelete.splice(index, 1);
  console.log(this.arrayiddelete)
  localStorage.setItem('arraycomparecar',"")
}

for(let i=0 ;i<this.arrayiddelete.length;i++)
  { //var existing=localStorage.getItem('arraycomparecar')
  //   var data
   
  //   data = existing?existing.split(',') : [];
 if(localStorage.getItem('arraycomparecar')=="") localStorage.setItem('arraycomparecar',this.arrayiddelete[i])
 else localStorage.setItem('arraycomparecar',localStorage.getItem('arraycomparecar')+","+this.arrayiddelete[i])
  //  data.push(this.arrayiddelete[i]);
  //  console.log(data)
  }
  //localStorage.setItem('arraycomparecar', data.toString());
  this.arrayiddelete=[]
  window.location.reload()

  }
  addcomparecar()
  {
    this.router.navigate(['/listcar']);
  }
}
