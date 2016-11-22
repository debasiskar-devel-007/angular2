import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/customerdashboard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerdashboard {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    userDetails:any;
    details12:any;
    private router: Router;
    details1:any;
    banner_image:any;
    name:any;
    zip:any;
    description:any;
    address1:any;
    city:any;
    state:any;
    phone:any;
    websiteurl:any;
    email:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router) {

        this.details12='';
        this.details1='';
        this.banner_image= 'images/img_customersignup_car.png';
        this.items = commonservices.getItems();
        this.router=router;
        this.userDetails=userdetails.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
        // console.log(userdetails.getObject('userdetails'));
        this.http=http;
        let idss = {username: this.userDetails.username};
        this.http.post(this.serverUrl + 'editdcustomerbyusername', idss)
            .subscribe(data2 => {

                 this.details12 = data2.json()[0];

                let ids = {username: this.details12.dealerusername};
                this.http.post(this.serverUrl + 'editdealerbyusername', ids)
                    .subscribe(data => {



                        this.details1 = data.json()[0];
                        this.name=this.details1.fname+' '+this.details1.lname;
                        this.description=this.details1.description;
                        this.address1=this.details1.address;
                      //  console.log(this.address1);
                        this.city=this.details1.city;
                        this.state=this.details1.state;
                        this.zip=this.details1.zip;
                        this.phone=this.details1.phone;
                        this.websiteurl=this.details1.websiteurl;
                        this.email=this.details1.email;
                       // console.log(this.details1);
                        if(this.details1.banner) {
                            this.banner_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.banner;
                        }   else{
                            this.banner_image= 'images/img_customersignup_car.png';
                        }
                       // console.log(this.banner_image);
                    }, error => {
                        console.log("Oooops!");
                    });

            }, error => {
                console.log("Oooops!");
            });
        console.log(this.details12.dealerusername);



    }




}


