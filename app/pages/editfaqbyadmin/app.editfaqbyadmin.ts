import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';



@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/addfaqbyadmin/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditFaqbyAdmin {
    // /@ViewChild(Modal) modal;
    addadminform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private userInfo:any;
    private router: Router;
    ckeditorContent:any;
    private sub: any;
    faqdetails:any;
    id:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute) {

        this.ckeditorContent = '';
        this.items = commonservices.getItems();
        this.http=http;
        this.userInfo=userInfo.getObject('userdetails');
        this.router=router;
        //this.userInfo=userInfo;
        console.log(this.items);
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

        this.addadminform = fb.group({
            title: ["", Validators.required],
            priority: ["", Validators.required],
            body: ["", Validators.required],
            addedby: [this.userInfo.username, Validators.required],
            addedusertype: ["admin", Validators.required],
            is_active: [""]
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getfaqdetailsbyid',ids)
                .subscribe(data => {
                    console.log(data);
                    this.faqdetails=data.json()[0];
                    this.addadminform = fb.group({
                        title: [this.faqdetails.title, Validators.required],
                        _id: [this.faqdetails._id, Validators.required],
                        priority: [this.faqdetails.priority, Validators.required],
                        body: [this.faqdetails.body, Validators.required],
                        addedby: [this.userInfo.username, Validators.required],
                        addedusertype: [this.faqdetails.addedusertype, Validators.required],
                        is_active: [this.faqdetails.is_active]
                    });
                    this.ckeditorContent = this.faqdetails.body;


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

        //this.router.navigate(['/about']);
    }

    onChange(event:any){
        //alert(99);
        //(<FormControl>this.addadminform.controls['body']).updateValue(this.ckeditorContent);
        this.addadminform.patchValue({body: this.ckeditorContent})

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
            let link = this.serverUrl+'updatefaqs';
            var submitdata = this.addadminform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.router.navigateByUrl('/faq(adminheader:adminheader//adminfooter:adminfooter)')

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


