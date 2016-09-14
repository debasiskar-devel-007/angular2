import { NgModule }      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppAbout }  from './pages/about/app.about';
import { HttpModule, JsonpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppContact }  from './pages/contact/app.contact';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing, HttpModule,
    JsonpModule,],
  declarations: [ AppComponent ,AppContact,AppAbout ,AppHome],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
