import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-productadmin',
  templateUrl: './productadmin.component.html',
  styleUrls: ['./productadmin.component.css']
})
export class ProductadminComponent implements OnInit {
  data: any
  public array: any = []
  a: any
  public arraycar = []
  idcar: any

  newimage: boolean = false
  isSearch: boolean = false
  novalue: boolean = false
  Image; carName; CarInformation; airBag; body; carLife; colour; companyName; engineType; frontBrake; fuelConsumption; gear; longs; numberOfSeats; origin; overallSize; price; seat; status; tireParameters; topSpeed; wattage; yearOfManufacture: any
  imagePreview: any = null;
  checkfillImage; checkfillcarName; checkfillCarInformation; checkfillairBag; checkfillbody; checkfillcarLife; checkfillcolour; checkfillcompanyName; checkfillengineType; checkfillfrontBrake; checkfillfuelConsumption; checkfillgear; checkfilllongs; checkfillnumberOfSeats; checkfillorigin; checkfilloverallSize; checkfillprice; checkfillseat; checkfillstatus; checkfilltireParameters; checkfilltopSpeed; checkfillwattage; checkfillyearOfManufacture: boolean = false

  arraycompany: any = []
  selectedFile: File;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log(this.imagePreview)
    };
    reader.readAsDataURL(this.selectedFile);
  }
  formGroupCar: FormGroup
  formGroupSearch: FormGroup
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getcar()
    this.getcompany()


    // console.log(this.array)
    this.formGroupCar = this.formBuilder.group({
      carName: new FormControl("", [Validators.required]),
      companyName: new FormControl("", [Validators.required]),
      colour: new FormControl("", [Validators.required]),
      carLife: new FormControl("", [Validators.required]),
      origin: new FormControl("", [Validators.required]),
      CarInformation: new FormControl("", [Validators.required]),
      body: new FormControl("", [Validators.required]),
      numberOfSeats: new FormControl("", [Validators.required]),
      yearOfManufacture: new FormControl("", [Validators.required]),
      longs: new FormControl("", [Validators.required]),
      overallSize: new FormControl("", [Validators.required]),
      fuelConsumption: new FormControl("", [Validators.required]),
      topSpeed: new FormControl("", [Validators.required]),
      airBag: new FormControl("", [Validators.required]),
      seat: new FormControl("", [Validators.required]),
      engineType: new FormControl("", [Validators.required]),
      tireParameters: new FormControl("", [Validators.required]),
      frontBrake: new FormControl("", [Validators.required]),
      wattage: new FormControl("", [Validators.required]),
      gear: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      Image: new FormControl("", [Validators.required]),


    });
    this.formGroupSearch = this.formBuilder.group({
      search: new FormControl("", [Validators.required]),
    })

  }
  getcompany() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/company/all`, { headers: headers }).subscribe(res => {
      console.log(res)
      this.data = res

      this.arraycompany = this.data.data
      console.log(this.array)





    });



  }


  getcar() {
    this.isSearch = false
    this.novalue = false
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(`http://127.0.0.1:3000/api/car/all`, { headers: headers }).subscribe(res => {
      console.log(res)
      this.data = res

      this.array = this.data.data
      console.log(this.array)





    });



  }

  create(data): Observable<any> {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://127.0.0.1:3000/api/car/create`, data, { headers: headers });
  }
  Createproduct() {




    console.log(this.formGroupCar.valid)

    if (this.imagePreview != null) {
      this.formGroupCar.controls['Image'].setValue(this.imagePreview)

    }
    console.log(this.formGroupCar.value)

    if (this.formGroupCar.valid) {
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
          this.create(this.formGroupCar.value).subscribe((result) => {

            if (result) {
              console.log(result);

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
      this.Checkfill()

    }

  }
  Checkfill() {
    if (this.formGroupCar.get('carName')?.value == "") this.checkfillcarName = true
    if (this.formGroupCar.get('CarInformation')?.value == "") this.checkfillCarInformation = true
    if (this.formGroupCar.get('Image')?.value == "") this.checkfillImage = true
    if (this.formGroupCar.get('airBag')?.value == "") this.checkfillairBag = true
    if (this.formGroupCar.get('body')?.value == "") this.checkfillbody = true
    if (this.formGroupCar.get('carLife')?.value == "") this.checkfillcarLife = true

    if (this.formGroupCar.get('colour')?.value == "") this.checkfillcolour = true
    if (this.formGroupCar.get('companyName')?.value == "") this.checkfillcompanyName = true
    if (this.formGroupCar.get('engineType')?.value == "") this.checkfillengineType = true
    if (this.formGroupCar.get('frontBrake')?.value == "") this.checkfillfrontBrake = true
    if (this.formGroupCar.get('fuelConsumption')?.value == "") this.checkfillfuelConsumption = true
    if (this.formGroupCar.get('gear')?.value == "") this.checkfillgear = true
    if (this.formGroupCar.get('longs')?.value == "") this.checkfilllongs = true
    if (this.formGroupCar.get('numberOfSeats')?.value == "") this.checkfillnumberOfSeats = true
    if (this.formGroupCar.get('origin')?.value == "") this.checkfillorigin = true
    if (this.formGroupCar.get('overallSize')?.value == "") this.checkfilloverallSize = true
    if (this.formGroupCar.get('price')?.value == "") this.checkfillprice = true
    if (this.formGroupCar.get('seat')?.value == "") this.checkfillseat = true
    if (this.formGroupCar.get('status')?.value == "") this.checkfillstatus = true
    if (this.formGroupCar.get('tireParameters')?.value == "") this.checkfilltireParameters = true
    if (this.formGroupCar.get('wattage')?.value == "") this.checkfilltopSpeed = this.checkfillwattage = true
    if (this.formGroupCar.get('yearOfManufacture')?.value == "") this.checkfillyearOfManufacture = true



  }
  deleteCar(id) {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    console.log(token)

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
        this.http.delete(`http://127.0.0.1:3000/api/car/?deleteId=` + id, { headers: headers }).subscribe(res => {
          console.log(res)

        });
        Swal.fire(
          'Success!',
          '',
          'success'

        )
        this.getcar()

      }


    })






  }

  currentcar(id) {


    //this.idcar=localStorage.getItem('idcar')
    this.idcar = id
    // console.log(this.idcar)
    let headers = new HttpHeaders();
    // var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // var token = currentUser.token; // your token
    // console.log(token)




    this.http.get(`http://127.0.0.1:3000/api/car/?getId=` + id, { headers: headers }).subscribe(res => {

      this.data = res
      this.formGroupCar = this.formBuilder.group({
        carName: new FormControl(this.data.data.carName, [Validators.required]),
        companyName: new FormControl(this.data.data.companyName, [Validators.required]),
        colour: new FormControl(this.data.data.colour, [Validators.required]),
        carLife: new FormControl(this.data.data.carLife, [Validators.required]),
        origin: new FormControl(this.data.data.origin, [Validators.required]),
        CarInformation: new FormControl(this.data.data.CarInformation, [Validators.required]),
        body: new FormControl(this.data.data.body, [Validators.required]),
        numberOfSeats: new FormControl(this.data.data.numberOfSeats, [Validators.required]),
        yearOfManufacture: new FormControl(this.data.data.yearOfManufacture, [Validators.required]),
        longs: new FormControl(this.data.data.longs, [Validators.required]),
        overallSize: new FormControl(this.data.data.overallSize, [Validators.required]),
        fuelConsumption: new FormControl(this.data.data.fuelConsumption, [Validators.required]),
        topSpeed: new FormControl(this.data.data.topSpeed, [Validators.required]),
        airBag: new FormControl(this.data.data.airBag, [Validators.required]),
        seat: new FormControl(this.data.data.seat, [Validators.required]),
        engineType: new FormControl(this.data.data.engineType, [Validators.required]),
        tireParameters: new FormControl(this.data.data.tireParameters, [Validators.required]),
        frontBrake: new FormControl(this.data.data.frontBrake, [Validators.required]),
        wattage: new FormControl(this.data.data.wattage, [Validators.required]),
        gear: new FormControl(this.data.data.gear, [Validators.required]),
        status: new FormControl(this.data.data.status, [Validators.required]),
        price: new FormControl(this.data.data.price, [Validators.required]),
        Image: new FormControl(this.data.data.Image, [Validators.required]),


      });
      this.Image = this.data.data.Image

      console.log(this.Image)

    });



  }
  Updatecar() {
    if (this.imagePreview != null) {
      this.formGroupCar.controls['Image'].setValue(this.imagePreview)

    }
    console.log(this.formGroupCar.value)
    if (this.formGroupCar.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.update(this.formGroupCar.value).subscribe((result) => {
            console.log(result)


            if (result)
              console.log(result);





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
      this.Checkfill()

    }





  }
  update(data): Observable<any> {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    // console.log(token)
    return this.http.post(`http://127.0.0.1:3000/api/car/?updateId=` + this.idcar, data, { headers: headers });
  }
  changenewimage() {
    if (this.imagePreview != null) {
      this.newimage = true

    }
  }
  searchCar() {
    if (this.formGroupSearch.valid) {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      console.log(token)
      // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



      this.http.get(`http://127.0.0.1:3000/api/car/car_name?search=` + this.formGroupSearch.controls['search'].value, { headers: headers }).subscribe(res => {

        this.data = res

        this.array = this.data.data
        if (this.array.length == 0) this.novalue = true
        //else this.novalue=false
        this.isSearch = true


      });



    }
  }



  download() {





    this.http.get(`http://127.0.0.1:3000/api/car/all`).subscribe(res => {
      console.log(res)
      this.data = res

      this.array = this.data.data
      var templateToExcel:any = [["Name Car","Company Name","colour","Car life","Origin",
      "body","Number of seat","year of manufacture","longs","Overall size","fuel","Top speed",
      "air bag","seat","engine type","tire parametter","frontbrake","wattage","gear","status","price","Car information "]]
      for (let i = 0; i < this.array.length; i++) { 
        
       templateToExcel.push([this.array[i].carName,this.array[i].companyName,this.array[i].colour,this.array[i].carLife,this.array[i].origin,
        this.array[i].body,this.array[i].numberOfSeats,this.array[i].yearOfManufacture,this.array[i].longs,this.array[i].overallSize,this.array[i].fuelConsumption,this.array[i].topSpeed,
        this.array[i].airBag,this.array[i].seat,this.array[i].engineType,this.array[i].tireParameters,this.array[i].frontBrake,this.array[i].wattage,this.array[i].gear,this.array[i].status,this.array[i].price,this.array[i].CarInformation])



      }
      console.log(templateToExcel)
this.exportTemplateAsExcel(templateToExcel)






    });
  }

  exportTemplateAsExcel(templateToExcel) {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(templateToExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "All car" + ".xlsx");
  }
  cancleupdate()
  {
    window.location.reload()
  }
}
