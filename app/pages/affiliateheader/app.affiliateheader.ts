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
    templateUrl:'app/pages/affiliateheader/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAffiliateheader {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    loginerror:any;
    userDetails:any;
    coockieData:CookieService;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router  ) {

//console.log(userdetails);
        this.coockieData=userdetails;
        this.router=router;
        this.userDetails=userdetails.getObject('userdetails');
       // console.log(userdetails.getObject('userdetails'));
       // console.log(this.userDetails.username);
        if(typeof(this.userDetails)=='undefined'){
            this.router.navigateByUrl('/affiliatelogin');
            return;
        }

/*
        if(typeof(this.userDetails)!='undefined'){
            this.router.navigateByUrl('/admindashboard(adminheader:adminheader//adminfooter:adminfooter)');
            return;
        }
*/

    }

    logout(){

        this.coockieData.removeAll();
        this.router.navigateByUrl('/affiliatelogin');

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

}


