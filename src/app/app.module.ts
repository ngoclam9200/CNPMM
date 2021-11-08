import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileuserComponent } from './profileuser/profileuser.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LayoutadminComponent } from './layoutadmin/layoutadmin.component';
import { AlluserComponent } from './alluser/alluser.component';
import { EditaboutComponent } from './editabout/editabout.component';
import { ListcarComponent } from './listcar/listcar.component';
import { CardetailComponent } from './cardetail/cardetail.component';
import { ProductadminComponent } from './productadmin/productadmin.component';
import { CompanycarComponent } from './companycar/companycar.component';
import { ListcompanycarComponent } from './listcompanycar/listcompanycar.component';
import { SearchcarComponent } from './searchcar/searchcar.component';
import { CarcomparisonComponent } from './carcomparison/carcomparison.component';
import { ScheduleadminComponent } from './scheduleadmin/scheduleadmin.component';
import { ScheduleuserComponent } from './scheduleuser/scheduleuser.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ListbookinguserComponent } from './listbookinguser/listbookinguser.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LayoutComponent,
    SignupComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    ProfileuserComponent,
    ResetpasswordComponent,
    LayoutadminComponent,
    AlluserComponent,
    EditaboutComponent,
    ListcarComponent,
    CardetailComponent,
    ProductadminComponent,
    CompanycarComponent,
    ListcompanycarComponent,
    SearchcarComponent,
    CarcomparisonComponent,
    ScheduleadminComponent,
    ScheduleuserComponent,
    StatisticsComponent,
    ListbookinguserComponent,
    NotfoundpageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'signin', component: SigninComponent },

      { path: 'signup', component: SignupComponent },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'editabout', component: EditaboutComponent },
      { path: 'alluser', component: AlluserComponent },
      { path: 'productadmin', component: ProductadminComponent },
      { path: 'companycar', component: CompanycarComponent },
      { path: 'listcompanycar', component: ListcompanycarComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'profileuser', component: ProfileuserComponent },
      { path: 'layoutadmin', component: LayoutadminComponent },
      { path: 'resetpassword', component: ResetpasswordComponent },
      { path: 'searchcar', component: SearchcarComponent },
      { path: 'listbookinguser', component: ListbookinguserComponent },
      { path: 'listcar', component: ListcarComponent },
      { path: 'cardetail', component: CardetailComponent },
      { path: 'carcomparison', component: CarcomparisonComponent },
      { path: 'scheduleadmin', component: ScheduleadminComponent },
      { path: 'scheduleuser', component: ScheduleuserComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'layout', component: LayoutComponent },
      {path:'notfoundpage', component:NotfoundpageComponent}
    ])


  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
