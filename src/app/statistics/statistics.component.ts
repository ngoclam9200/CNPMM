import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'
import { Router } from '@angular/router'
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  data: any
  array: any = []
  arraymonth: any = []
  newarraymonth: any = []

  arraynumberofbooking: any = []
  arraycompany: any = []
  newarraycompany: any = []

  arraynumberofcompany: any = []
  arraybackgroundcolor: any = []

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.statisticsbooking()
    this.statisticscompay()


  }


  statisticsbooking() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/schedule/all`, { headers: headers }).subscribe(res => {

      this.data = res
      this.array = this.data.data
      console.log(this.array)
      for (let i = 0; i < this.array.length; i++) {
        var t = this.array[i].time
        t = t.slice(0, 7)


        this.arraymonth.push(t)





      }

      for (var i = 0; i < this.arraymonth.length; i++) {
        if (this.newarraymonth.indexOf(this.arraymonth[i]) === -1) {
          this.newarraymonth.push(this.arraymonth[i])
        }
      }
      this.newarraymonth.unshift("")
      this.newarraymonth.sort()

      console.log(this.newarraymonth)
      for (let i = 0; i < this.newarraymonth.length; i++) {
        var number = 0
        for (let j = 0; j < this.array.length; j++) {
          var t = this.array[j].time
          t = t.slice(0, 7)
          if (t == this.newarraymonth[i]) number++

        }
        this.arraynumberofbooking.push(number)

      }
      console.log(this.arraynumberofbooking)

      const myChart = new Chart("myChart", {

        type: 'line',
        data: {

          labels: this.newarraymonth,
          datasets: [{
            label: 'Number of bookings',

            data: this.arraynumberofbooking,


            fill: false,
            borderColor: '#82C0E7',
            tension: 0.1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Number of bookings per month',
              align: 'center',

              position: 'bottom'

            }
          }
        }

      });



    });



  }

  statisticscompay() {
    let headers = new HttpHeaders();
    this.http.get(`http://127.0.0.1:3000/api/car/all`, { headers: headers }).subscribe(res => {

      this.data = res
      this.array = this.data.data
      console.log(this.array)
      for (let i = 0; i < this.array.length; i++) {
        var t = this.array[i].companyName



        this.arraycompany.push(t)





      }

      for (var i = 0; i < this.arraycompany.length; i++) {
        if (this.newarraycompany.indexOf(this.arraycompany[i]) === -1) {
          this.newarraycompany.push(this.arraycompany[i])
        }
      }

      this.newarraycompany.sort()

      console.log(this.newarraycompany)
      for (let i = 0; i < this.newarraycompany.length; i++) {
        var number = 0
        for (let j = 0; j < this.array.length; j++) {
          var t = this.array[j].companyName

          if (t == this.newarraycompany[i]) number++

        }
        this.arraynumberofcompany.push(number)

      }
      console.log(this.arraynumberofcompany)

      for (let i = 0; i < this.newarraycompany.length; i++) {



        this.arraybackgroundcolor.push("rgb(" + Math.floor(Math.random() * (255 + 1)) + "," + Math.floor(Math.random() * (255 + 1)) + "," + Math.floor(Math.random() * (255 + 1)) + ")")

      }
      const myChart = new Chart("myChartcompany", {

        type: 'pie',
        data: {

          labels: this.newarraycompany,
          datasets: [{
            label: 'Number of bookings',

            data: this.arraynumberofcompany,


            backgroundColor: this.arraybackgroundcolor,
            borderColor: '#82C0E7',

          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Number of cars of company',
              align: 'center',

              position: 'bottom'

            }
          }
        },


      });



    });



  }


}
