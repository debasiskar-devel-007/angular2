import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Control} from '@angular/common';
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/signup/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppSignup {
    // /@ViewChild(Modal) modal;
    signupform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ) {

        this.items = commonservices.getItems();
        this.http=http;
        console.log(this.items);
        console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;

        this.signupform = fb.group({
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", AppSignup.validateEmail],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            term: ["", AppSignup.validateTerms]
        });

        //this.router.navigate(['/about']);
    }


    static validateTerms(control: Control){

        console.log('34324324');
        console.log(control.value);
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }

    static validateEmail(control: Control){

        console.log('34324324');
        console.log(control.value);
        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
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
        console.log(this.signupform.valid);
        console.log(this.signupform.errors);
        if(this.signupform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'adddealer';
            var submitdata = this.signupform.value;
            console.log(this.items);

            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    console.log(data);


                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


