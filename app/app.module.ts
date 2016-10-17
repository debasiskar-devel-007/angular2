import {NgModule, Provider}      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppAbout }  from './pages/about/app.about';
import { AppSignup }  from './pages/signup/app.signup';
import { AppSignupComponents }  from './pages/signup/app.signupcomponent';
import { AppCustomersignup }  from './pages/customersignup/app.customersignup';
import { AppCustomersignupComponents }  from './pages/customersignup/app.customersignupcomponent';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import { HttpModule, JsonpModule } from '@angular/http';
import {PopoverModule} from "ng2-popover";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs/Observable';
import {AppCommonservices} from  './services/app.commonservices';

import { AppContact }  from './pages/contact/app.contact';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ng2-modal";
import {AppdealerloginComponents} from "./pages/dealerlogin/app.dealerlogincomponent";
import {AppDealerlogin} from "./pages/dealerlogin/app.dealerlogin";
import {AppDealerheader} from "./pages/dealerheader/app.dealerheader";
import {AppDealerfooter} from "./pages/dealerfooter/app.dealerfooter";
import {AppDealerdashboard} from "./pages/dealerdashboard/app.dealerdashboard";
import {AppAdminlogin} from "./pages/adminlogin/app.adminlogin";
import { AppadminloginComponents }  from './pages/adminlogin/app.adminlogincomponent';
import {AppCustomerlogin} from "./pages/customerlogin/app.customerlogin";
import { AppcustomerloginComponents }  from './pages/customerlogin/app.customerlogincomponent';
import { AppAdminheader }  from './pages/adminheader/app.adminheader';
import { AppAdminfooter }  from './pages/adminfooter/app.adminfooter';
import { AppAdmindashboard }  from './pages/admindashboard/app.admindashboard';
import { AppAddadmin }  from './pages/addadmin/app.addadmin';
import { AppAdminlist }  from './pages/adminlist/app.adminlist';



@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing, HttpModule,
    JsonpModule,ModalModule,PopoverModule],
  declarations: [ AppComponent ,AppAdminheader,AppAdminfooter,AppAdmindashboard,AppAdminlist,AppAddadmin,AppContact,AppAbout ,AppHome,AppSignup,AppSignupComponents,AppCreditcard,AppdealerloginComponents,AppDealerlogin,AppDealerheader,AppDealerfooter,AppDealerdashboard,AppCustomersignup,AppCustomersignupComponents,AppAdminlogin,AppadminloginComponents,AppCustomerlogin,AppcustomerloginComponents],
  providers: [
    appRoutingProviders,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
