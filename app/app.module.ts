import {NgModule, Provider}      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppAbout }  from './pages/about/app.about';
import { AppSignup }  from './pages/signup/app.signup';
import { AppSignupComponents }  from './pages/signup/app.signupcomponent';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import { HttpModule, JsonpModule } from '@angular/http';
import {PopoverModule} from "ng2-popover";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs/Observable';
import {AppCommonservices} from  './services/app.commonservices';

import { AppContact }  from './pages/contact/app.contact';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ng2-modal";



@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing, HttpModule,
    JsonpModule,ModalModule,PopoverModule],
  declarations: [ AppComponent ,AppContact,AppAbout ,AppHome,AppSignup,AppSignupComponents,AppCreditcard],
  providers: [
    appRoutingProviders,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
