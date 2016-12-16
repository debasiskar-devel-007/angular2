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
    templateUrl:'app/pages/addaffiliate/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddaffiliate {
    // /@ViewChild(Modal) modal;
    addaffiliateform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    private userInfo:any;
   // userinfo:any;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo.getObject('userdetails');
      //  console.log(this.userInfo.username);
       // console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
               // console.log(data);
                this.getusastates=data.json();
               // console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });
        // dealereusername: [this.userInfo.username,, Validators.required],
        this.addaffiliateform = fb.group({
            dealereusername: [this.userInfo.username, Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.required],
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", AppAddaffiliate.validateEmail],
            address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            is_active: [""]
        });

        //this.router.navigate(['/about']);
    }


    static validateTerms(control: FormControl){
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
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
    submitform(){
        let x:any;
        for(x in this.addaffiliateform.controls){
            this.addaffiliateform.controls[x].markAsTouched();

        }
        console.log(this.addaffiliateform.dirty);
        this.addaffiliateform.markAsDirty();
        if(this.addaffiliateform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'addaffiliate';
            var submitdata = this.addaffiliateform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.router.navigateByUrl('/affiliatelist(dealerheader:dealerheader//dealerfooter:dealerfooter)')

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


