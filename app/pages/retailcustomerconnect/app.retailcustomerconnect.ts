import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";
//import {SimplePageScroll} from 'ng2-simple-page-scroll';


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/retailcustomerconnect/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppRetailcustomerconnect {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    customersignupform: FormGroup;
    customersignupupdateform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private customerInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    customerinfo:any;
    getusastates:any;
    coockieData:CookieService;
    purchasetimilist:any;
    basepricelist:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,customerInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.customerinfo=customerInfo.getObject('customerInfo');
        console.log(this.customerinfo);
        this.customerInfo=customerInfo;
        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                //console.log(data);
                this.getusastates=data.json();

                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });

        this.customersignupform = fb.group({
            username: [this.customerinfo.username, Validators.required],
            fname: [this.customerinfo.fname, Validators.required],
            lname: [this.customerinfo.lname, Validators.required],
            email: [this.customerinfo.email, Validators.required],
            //email: [this.customerinfo.email, AppRetailcustomerconnect.validateEmail()],
            confirm_email: [''],
            phone: [this.customerinfo.phone, Validators.required],
            address: [this.customerinfo.address, Validators.required],
            addressline2: [''],
            city: [this.customerinfo.city, Validators.required],
            zip: [this.customerinfo.zip, Validators.required],
            company_name: [''],
            alt_phone: [''],
            state: [this.customerinfo.state, Validators.required],
            term: [this.customerinfo.term, AppRetailcustomerconnect.validateTerms]
        });

        this.customersignupupdateform = fb.group({
            username: [this.customerinfo.username, Validators.required],
            send_mail: ['', Validators.required],
            retail_calculator: ['', Validators.required],
            purchase_time: ['', Validators.required],
            base_price: ['', Validators.required],
            color_opiton: ['', Validators.required],
            upcoming_auction: ['', Validators.required],
        });


        this.http.get(this.serverUrl+'purchasetimelist')
            .subscribe(data => {
                //console.log(data);
                this.purchasetimilist=data.json();

                console.log(this.purchasetimilist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'basepricelist')
            .subscribe(data => {
                //console.log(data);
                this.basepricelist=data.json();

                console.log(this.basepricelist);


            }, error => {
                console.log("Oooops!");
            });


    }


     static validateTerms(control: FormControl){
         console.log('test');

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
        console.log(this.customersignupform.value);
        let x:any;
        for(x in this.customersignupform.controls){
            this.customersignupform.controls[x].markAsTouched();

        }
        this.customersignupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupform.valid){

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecustomer2';
            var submitdata = this.customersignupform.value;
            console.log(link);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    // console.log(data[0]);
                    this.customerInfo.putObject('customerInfo',this.customersignupform.value);
                   // this.coockieData.removeAll();
                    this.router.navigateByUrl('/retailcustomerconnect');
                    // this.router.navigate(['/retailcustomerconnect']);


                }, error => {
                    console.log("Oooops!");
                });
        }
    }
    updateformsubmit(){
        let x:any;
        for(x in this.customersignupupdateform.controls){
            this.customersignupupdateform.controls[x].markAsTouched();

        }
        this.customersignupupdateform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupupdateform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecustomer';
            var submitdata = this.customersignupupdateform.value;
            console.log(submitdata);
           /* this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    console.log(this.customersignupupdateform.value);
                   // this.customerInfo.putObject('customerInfo',this.customersignupupdateform.value);
                    this.router.navigateByUrl('/retailcustomerconnect');
                    // this.router.navigate(['/retailcustomerconnect']);


                }, error => {
                    console.log("Oooops!");
                });*/
        }
    }

    goto(){
       this.router.navigate(['/finance']) ;
    }

}


