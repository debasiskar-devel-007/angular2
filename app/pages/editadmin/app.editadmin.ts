import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";




@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editadmin/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditadmin implements OnInit, OnDestroy{
    // /@ViewChild(Modal) modal;
    addadminform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private cookeiservice:CookieService;
    private router: Router;
    id: number;
    private sub: any;
    admindetails: any;
    appcomponent:AppComponent;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,cookeiservice:CookieService ,router: Router ,private route: ActivatedRoute,appcomponent:AppComponent) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.cookeiservice=cookeiservice;
        this.appcomponent=appcomponent;
        console.log(this.items);
        console.log(this.items[0].serverUrl);
        this.serverUrl = this.items[0].serverUrl;

        this.admindetails={
            username:"",
            password: "",
            fname: "",
            lname: "",
            email: "",
            address: "",
            city: "",
            state: "",
            phone: "",
            zip: "",
            is_active: ""
        }

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
           let ids={id:this.id};
            this.http.post(this.serverUrl+'editadmin',ids)
                .subscribe(data => {
                    console.log(data);
                    this.admindetails=data.json()[0];
                    console.log( this.admindetails);
                    console.log( this.admindetails.fname);
                    this.addadminform = fb.group({
                        username: [this.admindetails.username, Validators.required],
                        //password: ["", Validators.required],
                        fname: [this.admindetails.fname, Validators.required],
                        lname: [this.admindetails.lname, Validators.required],
                        email: [this.admindetails.email, AppEditadmin.validateEmail],
                        address: [this.admindetails.address, Validators.required],
                        city: [this.admindetails.city, Validators.required],
                        state: [this.admindetails.state, Validators.required],
                        phone: [this.admindetails.phone, Validators.required],
                        zip: [this.admindetails.zip, Validators.required],
                        is_active: [this.admindetails.is_active]
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

       // this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                console.log(data);
                this.getusastates=data.json();
                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });

        this.addadminform = fb.group({
            username: [this.admindetails.username, Validators.required],
            //password: ["", Validators.required],
            fname: [this.admindetails.fname, Validators.required],
            lname: ["", Validators.required],
            email: ["", AppEditadmin.validateEmail],
            address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            is_active: [""]
        });

        //this.router.navigate(['/about']);




    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            console.log((this.id));

            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
        for(x in this.addadminform.controls){
            this.addadminform.controls[x].markAsTouched();

        }
        console.log(this.addadminform.dirty);
        this.addadminform.markAsDirty();
        if(this.addadminform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updateadmin';
            var submitdata = this.addadminform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.appcomponent.putmessages('Admin user '+this.admindetails.username+' updated successfully','success');
                    //this.appcomponent.putmessages(this.admindetails.username+' updated successfully ......','success');

                    this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }
    allroute(){
        this.router.navigateByUrl('/signup(dealerheader:dealerheader//dealerfooter:dealerfooter)');

    }
    godashboard(){
        this.router.navigateByUrl('/dealerdashboard(dealerheader:dealerheader//dealerfooter:dealerfooter)')
    }

}


