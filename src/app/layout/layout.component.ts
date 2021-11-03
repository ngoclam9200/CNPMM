import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLogin=false
  username:any
  constructor( private router:Router) { }

  ngOnInit(): void {
  
   
  
    if(localStorage.getItem('currentUser') !=null)
    {
      this.isLogin=true
      console.log(this.isLogin)
      this.username=localStorage.getItem('userName')
     
    }
  }
  logout(){
   
 
    localStorage.clear()
    this.router.navigate(['/signin']);
    return this.isLogin=false
  }

}


