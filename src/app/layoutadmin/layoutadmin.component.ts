import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-layoutadmin',
  templateUrl: './layoutadmin.component.html',
  styleUrls: ['./layoutadmin.component.css']
})
export class LayoutadminComponent implements OnInit {
username:any
  constructor(private router:Router) { }

  ngOnInit(): void {
     this.username=localStorage.getItem('userName')
  }
  logout(){
   
    // localStorage.removeItem('currentUser')
    // localStorage.removeItem('userName')
    // localStorage.removeItem('role')
    localStorage.clear()
    this.router.navigate(['/signin']);
    
  }
}
