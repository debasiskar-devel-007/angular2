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
    templateUrl:'app/pages/creditcard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCreditcard {
    // /@ViewChild(Modal) modal;
    signupform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getExpyears:any;
    expMonths:any;
    getusastates:any;
    serverUrl:any;
    private userInfo:CookieService;
    commonservices:AppCommonservices;
    userinfo:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService  ) {

        this.items = commonservices.getItems();
        this.getExpyears = commonservices.getExpyears();
        this.expMonths = commonservices.getMonths();
        //this.getusastates = commonservices.getusastates();
        this.userinfo=this.userInfo.getObject('userInfo');
        this.http=http;
        console.log(this.items);
        console.log(this.getusastates);
       // this.userInfo=userInfo;
        console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;

        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                console.log(data);
               this.getusastates=data.json();
                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });

        this.signupform = fb.group({
            username: [this.userinfo, Validators.required],
            address: ["", Validators.required],
            state: ["", Validators.required],
            expmonth: ["", Validators.required],
            city: ["", Validators.required],
            expyear: ["", Validators.required],
            ccno: ["", Validators.required],
            cvv: ["", Validators.required],
            fname: [this.userinfo.fname, Validators.required],
            lname: [this.userinfo.lname, Validators.required],
            email: [this.userinfo.email, AppCreditcard.validateEmail],
            phone: [this.userinfo.phone, Validators.required],
            zip: [this.userinfo.zip, Validators.required],
            //term: ["", AppCreditcard.validateTerms]
        });


        console.log(this.userInfo.getObject('userInfo'));
        //console.log(this.userInfo.getObject('userInfo').username);



        //this.router.navigate(['/about']);
    }


    static validateTerms(control: FormControl){

        console.log('34324324');
        console.log(control.value);
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }

    static validateEmail(control: FormControl){

        console.log('34324324');
        console.log(control.value);
        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }

    static validateState(control: FormControl){

        console.log(control.value+'stateval');
        if (control.value=='') {

            return { 'invalidState': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }
    submitform(){
        //this.signupform.set;
        let x:any;
        console.log(this.signupform.value.term);

        for(x in this.signupform.controls){
            this.signupform.controls[x].markAsTouched();

        }
        console.log(this.signupform.dirty);
        this.signupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        console.log(this.signupform.dirty);
        console.log(this.signupform.valid+'valid');
        console.log(this.signupform.errors);
        if(this.signupform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatedealer';
            var submitdata = this.signupform.value;
            console.log(this.signupform.value);

            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    console.log(data[0]);


                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


