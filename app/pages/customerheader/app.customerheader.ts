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
    templateUrl:'app/pages/customerheader/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerheader {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    data2:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    loginerror:any;
    userDetails:any;
    coockieData:CookieService;
    package_image:any;
    details1:any;
    details12:any;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router  ) {

//console.log(userdetails);
        this.details12='';
        this.coockieData=userdetails;
        this.items = commonservices.getItems();
        this.router=router;
        this.userDetails=userdetails.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
       // console.log(userdetails.getObject('userdetails'));
        console.log(this.userDetails.username);
        this.http=http;
        let idss = {username: this.userDetails.username};
        this.http.post(this.serverUrl + 'editdcustomerbyusername', idss)
            .subscribe(data2 => {
                this.details12 = data2.json()[0];

                console.log(this.details12.dealerusername);
                let ids = {username: this.details12.dealerusername};
                this.http.post(this.serverUrl + 'editdealerbyusername', ids)
                    .subscribe(data => {
                        this.details1 = data.json()[0];
                        console.log(this.details1);
                        console.log(this.details1.filename);
                        this.package_image="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.details1.filename;
                    }, error => {
                        console.log("Oooops!");
                    });

            }, error => {
                console.log("Oooops!");
            });
        console.log(this.details12.dealerusername);

        if(typeof(this.userDetails)=='undefined'){
            this.router.navigateByUrl('/adminlogin');
            return;
        }



    }

    logout(){

        this.coockieData.removeAll();
        this.router.navigateByUrl('/customerlogin');

    }
    getUserFullname(){
        this.userDetails=this.coockieData.getObject('userdetails');
        if(typeof(this.userDetails)!='undefined'){
            return this.userDetails.userfullname;
        }
        else{
            return '';
        }
    }
     adminlist(){
         this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
     }

    faq(){
        this.router.navigateByUrl('/faq(adminheader:adminheader//adminfooter:adminfooter)')
    }

}


