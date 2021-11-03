import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'

import Swal from 'sweetalert2';
@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  idcar: any
  data: any
  datarelate: any
  arrayrelate: any = []
  array: any = []
  arrayid: any = []
  tmparray: any = []
  dataCompany: any
  arrayCompany: any = []
  iddetail: any
  arraybooking: any = []
  _id; Image; carName; CarInformation; airBag; body; carLife; colour; companyName; engineType; frontBrake; fuelConsumption; gear; longs; numberOfSeats; origin; overallSize; price; seat; status; tireParameters; topSpeed; wattage; yearOfManufacture: any
  constructor(private http: HttpClient, private router: Router) { }
  isLogin: boolean = false
  ngOnInit(): void {


    this.currentcar()
    this.getlistcompanyname()
    this.getcarrelate()
    console.log(localStorage.getItem('arraycomparecar'))
    console.log(localStorage.getItem('currentUser'))
    if (localStorage.getItem('currentUser') == null) this.isLogin = false
    else this.isLogin = true

  }
  currentcar() {


    this.idcar = localStorage.getItem('idcar')

    console.log(this.idcar)
    let headers = new HttpHeaders();




    this.http.get(`http://127.0.0.1:3000/api/car/?getId=` + this.idcar, { headers: headers }).subscribe(res => {
      console.log(res)
      this.data = res
      this.Image = this.data.data.Image
      this.carName = this.data.data.carName
      this.yearOfManufacture = this.data.data.yearOfManufacture
      this.price = this.data.data.price
      this.carLife = this.data.data.carLife
      this.airBag = this.data.data.airBag
      this.body = this.data.data.body
      this.colour = this.data.data.colour
      this.engineType = this.data.data.engineType
      this.frontBrake = this.data.data.frontBrake
      this.fuelConsumption = this.data.data.fuelConsumption
      this.gear = this.data.data.gear
      this.longs = this.data.data.longs
      this.numberOfSeats = this.data.data.numberOfSeats
      this.origin = this.data.data.origin
      this.overallSize = this.data.data.overallSize;
      this.seat = this.data.data.seat;
      this.status = this.data.data.status;
      this.tireParameters = this.data.data.tireParameters;
      this.topSpeed = this.data.data.topSpeed;
      this.wattage = this.data.data.wattage;
      this.CarInformation = this.data.data.CarInformation
      this.companyName = this.data.data.companyName
      this._id = this.data.data._id
      console.log(this.companyName)
      localStorage.setItem('nameCompany', this.companyName)
      localStorage.setItem('idcardetail', this._id)












    });



  }
  getlistcompanyname() {
    let headers = new HttpHeaders();
    // var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // var token = currentUser.token; // your token
    // console.log(token)
    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/company/all`, { headers: headers }).subscribe(res => {
      console.log(res)
      this.dataCompany = res

      this.arrayCompany = this.dataCompany.data
      console.log(this.arrayCompany)





    });



  }
  searchcarbycompany(nameCompany) {
    localStorage.setItem('nameCompany', nameCompany)
    localStorage.setItem('iscompany', 'true')
    localStorage.setItem('iscar', 'false')
    this.router.navigate(['/searchcar']);
  }


  getcarrelate() {






    let headers = new HttpHeaders();

    this.http.get(`http://127.0.0.1:3000/api/car/company?search=` + localStorage.getItem('nameCompany'), { headers: headers }).subscribe(res => {

      this.datarelate = res

      this.tmparray = this.datarelate.data
      for (let i = 0; i < this.tmparray.length; i++) {
        this.arrayrelate.push(this.tmparray[i])
        if (i == 3) break
      }
      console.log(this.arrayrelate)





    });






  }
  getallrelate() {
    localStorage.setItem('iscompany', 'true')
    localStorage.setItem('iscar', 'false')
    this.router.navigate(['/searchcar']);

  }
  comparecar() {
    console.log(localStorage.getItem('arraycomparecar'))
    this.iddetail = localStorage.getItem('idcardetail')
    if (localStorage.getItem('arraycomparecar') == null || localStorage.getItem('arraycomparecar') == "") {
      localStorage.setItem('arraycomparecar', this.iddetail);

      this.router.navigate(['/carcomparison']);

    }
    else {
      this.idcar = localStorage.getItem('arraycomparecar')
      if (this.idcar.length > 96) {
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
      else {

        var existing = localStorage.getItem('arraycomparecar');
        this.idcar = localStorage.getItem('arraycomparecar')
        var i = 0
        var length = this.idcar //74
        var start = 0
        var numberstring = Math.floor(length.length / 24)

        while (i < numberstring) {

          var t = this.idcar.indexOf(",")
          console.log(t)
          if (t == -1) this.arrayid.push(this.idcar)
          else this.arrayid.push(this.idcar.slice(start, t))

          this.idcar = this.idcar.slice(t + 1, this.idcar.length)


          i++;
          console.log(this.arrayid)

        }
        for (let i = 0; i < this.arrayid.length; i++) {
          if (this.arrayid[i] == this.iddetail) {
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
        this.iddetail = localStorage.getItem('arraycomparecar')
        data = existing ? existing.split(',') : [];


        data.push(this.iddetail);


        localStorage.setItem('arraycomparecar', data.toString());


        this.router.navigate(['/carcomparison']);
      }




    }





  }


  booking(idcar, namecar) {
    var exitst = false
    localStorage.setItem('idcar', idcar)
    localStorage.setItem('namecar', namecar)
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token

    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/schedule/user`, { headers: headers }).subscribe(res => {

      this.data = res

      this.arraybooking = this.data.data
      console.log(this.arraybooking)
      console.log(idcar)
      for (let i = 0; i < this.arraybooking.length; i++) {
        if (idcar == this.arraybooking[i].carId) {
          exitst = true
          break

        }


      }
      console.log(exitst)
      console.log(this.arraybooking.length)
      if (this.arraybooking.length == 4) {
        Swal.fire({
          title: 'You can only book 4 cars',
          text: "Are you want to go your booking",
          icon: 'warning',
          showCancelButton: true,
          width: 500,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes,going it!'
        }).then((result) => {
          if (result.isConfirmed) {


            this.router.navigate(['/listbookinguser']);


          }
          else return


        })

      }
      else if (exitst == true) {

        Swal.fire({
          title: 'you booked this car',
          text: "Are you want to go your booking",
          icon: 'warning',
          showCancelButton: true,
          width: 500,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes,going it!'
        }).then((result) => {
          if (result.isConfirmed) {


            this.router.navigate(['/listbookinguser']);


          }
          else return


        })

      }

      else this.router.navigate(['/scheduleuser']);

    });


  }
}
