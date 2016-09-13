import { NgModule }      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppAbout }  from './pages/about/app.about';

import { AppContact }  from './pages/contact/app.contact';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing],
  declarations: [ AppComponent ,AppContact,AppAbout ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
