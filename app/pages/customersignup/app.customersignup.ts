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
    templateUrl:'app/pages/customersignup/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomersignup {
    // /@ViewChild(Modal) modal;
    customersignupform: FormGroup;
    myModal :ModalModule;
    data:any;

    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private customerInfo:CookieService;
    private router: Router;
    customerinfo:any;
    terms:any;
    package_image:any;
    details1:any;
    coockieData:CookieService;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,customerInfo:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.customerInfo=customerInfo;

        this.serverUrl = this.items[0].serverUrl;
        var parts = location.hostname.split('.');
        var sndleveldomain = parts[0];
        let ids = {username: sndleveldomain};
        this.http.post(this.serverUrl + 'editdealerbyusername', ids)
            .subscribe(data => {
                this.details1 = data.json()[0];
                console.log(this.details1);
                this.package_image="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.details1.filename;
            }, error => {
                console.log("Oooops!");
            });

       // console.log(parts);
       // console.log(sndleveldomain);
        this.customersignupform = fb.group({
            dealerusername: [sndleveldomain, Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.required],
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", AppCustomersignup.validateEmail],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            term: ["", AppCustomersignup.validateTerms]
        });
    }


    static validateTerms(control: FormControl){

        if(control.value==false){
            return { 'isTermsChecked': true };
        }
    }

    static validateEmail(control: FormControl){

        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
    }
    submitform(){
        let x:any;

        for(x in this.customersignupform.controls){
            this.customersignupform.controls[x].markAsTouched();
        }
        this.customersignupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupform.valid){

            let link = this.serverUrl+'addcustomer';
            var submitdata = this.customersignupform.value;
    console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.customersignupform.value.password='';
                    if(this.customersignupform.value.term==true){
                          this.terms=1;
                    }
                    else {
                          this.terms=0;
                    }
                    this.customersignupform.value.term=this.terms;
                   // console.log(this.customersignupform.value.term);
                    this.customerInfo.putObject('customerInfo', this.customersignupform.value);
                    this.router.navigate(['/customercreditcard']);
                }, error => {
                    console.log("Oooops!");
                });
        }
    }
}


