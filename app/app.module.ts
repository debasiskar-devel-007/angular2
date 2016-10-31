import {NgModule, Provider}      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppAbout }  from './pages/about/app.about';
import { AppSignup }  from './pages/signup/app.signup';
import { AppSignupComponents }  from './pages/signup/app.signupcomponent';
import { AppCustomersignup }  from './pages/customersignup/app.customersignup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import { HttpModule, JsonpModule } from '@angular/http';
import {PopoverModule} from "ng2-popover";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs/Observable';
import {AppCommonservices} from  './services/app.commonservices';
import {searchPipe} from  './services/search.pipe';
import {OrderBy} from  './services/orderby';

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
import { AppEditadmin }  from './pages/editadmin/app.editadmin';
import { AppAddfaq }  from './pages/addfaq/app.addfaq';
import { AppEditFaqbyAdmin }  from './pages/editfaqbyadmin/app.editfaqbyadmin';
import { AppAddFaqByAdmin }  from './pages/addfaqbyadmin/app.addfaqbyadmin';
import { AppAdminlist }  from './pages/adminlist/app.adminlist';
import { AppFaq }  from './pages/faq/app.faq';
import { AppDealerFaq }  from './pages/dealerfaq/app.faq';
import { AppCustomercreditcard }  from './pages/customercreditcard/app.customercreditcard';
import {Ng2PaginationModule} from 'ng2-pagination';
import { CKEditorModule } from 'ng2-ckeditor';



@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing, HttpModule,
    JsonpModule,ModalModule,PopoverModule,Ng2PaginationModule,CKEditorModule],
  declarations: [ AppComponent ,AppAdminheader,AppAdminfooter,AppAdmindashboard,AppAdminlist,AppAddadmin,AppContact,AppAbout ,AppHome,AppSignup,AppSignupComponents,AppCreditcard,AppdealerloginComponents,AppDealerlogin,AppDealerheader,AppDealerfooter,AppDealerdashboard,AppCustomersignup,AppCustomercreditcard,AppAdminlogin,AppadminloginComponents,AppCustomerlogin,AppcustomerloginComponents,AppAddfaq,AppFaq,AppEditadmin,searchPipe,OrderBy,AppAddFaqByAdmin,AppEditFaqbyAdmin,AppDealerFaq],
  providers: [
    appRoutingProviders,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
