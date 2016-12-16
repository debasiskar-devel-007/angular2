import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";
//import {ClipboardDirective} from './clipboard.directive';




@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editaffiliate/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditaffiliate implements OnInit, OnDestroy{
    // /@ViewChild(Modal) modal;
    addaffiliateform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private userInfo:CookieService;
    private router: Router;
    id: number;
    private sub: any;
    affiliatedetails: any;
    appcomponent:AppComponent;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute,appcomponent:AppComponent) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                this.getusastates=data.json();
                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'editaffiliate',ids)
                .subscribe(data => {
                    this.affiliatedetails=data.json()[0];
                    this.addaffiliateform = fb.group({
                        username: [this.affiliatedetails.username, Validators.required],
                       // password: ["", Validators.required],
                        fname: [this.affiliatedetails.fname, Validators.required],
                        lname: [this.affiliatedetails.lname, Validators.required],
                        email: [this.affiliatedetails.email, AppEditaffiliate.validateEmail],
                        address: [this.affiliatedetails.address, Validators.required],
                        city: [this.affiliatedetails.city, Validators.required],
                        state: [this.affiliatedetails.state, Validators.required],
                        phone: [this.affiliatedetails.phone, Validators.required],
                        zip: [this.affiliatedetails.zip, Validators.required],
                        is_active: [this.affiliatedetails.is_active]
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

        this.addaffiliateform = fb.group({
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", AppEditaffiliate.validateEmail],
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
        for(x in this.addaffiliateform.controls){
            this.addaffiliateform.controls[x].markAsTouched();

        }
        console.log(this.addaffiliateform.dirty);
        this.addaffiliateform.markAsDirty();
        if(this.addaffiliateform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updateaffiliate';
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


