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
    templateUrl:'app/pages/customerlogin/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerlogin{
    // /@ViewChild(Modal) modal;
    customerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router ) {

        this.items = commonservices.getItems();
        this.serverUrl=this.items[0].serverUrl;
        this.http=http;
        this.router=router;

        this.customerloginform = fb.group({

            //term: ["", AppCreditcard.validateTerms]
            username: ["", Validators.required],
            password: ["", Validators.required]

        });
    }



    submitform(){
        //this.signupform.set;
        let x:any;
   //     console.log(this.dealerloginform.value.term);

        for(x in this.customerloginform.controls){
            this.customerloginform.controls[x].markAsTouched();

        }
       // console.log(this.dealerloginform.dirty);
        this.customerloginform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
       if(this.customerloginform.valid){
            let link = this.serverUrl+'usercheck';
            var submitdata = this.customerloginform.value;

            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();

                    console.log(data.json());

                var res=data.json();
                    if(res.length>0){
                        console.log('Login successfully');
                        this.loginerror=1;
                        this.router.navigateByUrl('/dealerdashboard(dealerheader:dealerheader//dealerfooter:dealerfooter)');
                    }
                    else{
                        console.log('Invalid username/password');
                        this.loginerror=0;
                    }

                }, error => {
                    console.log("Oooops!");
                });


        }
    }

    goSignup(){
        this.router.navigateByUrl('/signup');
    }

}


