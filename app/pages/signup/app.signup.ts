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
    templateUrl:'app/pages/signup/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppSignup {
    // /@ViewChild(Modal) modal;
    signupform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    static serverUrl:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    static instance:AppSignup;
    private userInfo:CookieService;
    private router: Router;
    showloader:any;
    loginerror:any;
    static isCreating:Boolean = false;
    static fb:FormBuilder;
    static http:Http;
    fb:FormBuilder;
    static  commonservices:AppCommonservices;
    static  userInfo:CookieService;
    static  router:Router;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router) {
        if (!AppSignup.isCreating) {

            this.items = commonservices.getItems();
            this.http = http;
            this.router = router;
            this.userInfo = userInfo;
            console.log(this.items);
            console.log(this.items[0].serverUrl);
            this.showloader = false;

            this.serverUrl = this.items[0].serverUrl;

            this.signupform = fb.group({
                username: ["", this.validateUsername.bind(this)],
                password: ["", Validators.required],
                fname: ["", Validators.required],
                lname: ["", Validators.required],
                email: ["", AppSignup.validateEmail],
                phone: ["", Validators.required],
                zip: ["", Validators.required],
                term: ["", AppSignup.validateTerms]
            });
        }

        //this.router.navigate(['/about']);
    }


    static validateTerms(control: FormControl){

        //console.log('34324324');
        //console.log(control.value);
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }

    static validateEmail(control: FormControl){

        //console.log('34324324');
        //console.log(control.value);
        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
        //let appsignupobj=new AppSignup();
        // /console.log(appsignupobj.signupform.value.term);

    }



     validateUsername(control: FormControl){

        console.log('34324324');
        console.log(control.value);
        let username={username:control.value};
        if (control.value=='') {

            return { 'invalidEmailAddress': true };
        }
       /* if (AppSignup.instance == null) {
            AppSignup.isCreating = true;
            AppSignup.instance = new AppSignup(AppSignup.fb , AppSignup.http ,AppSignup.commonservices ,AppSignup.userInfo ,AppSignup.router);
            AppSignup.isCreating = false;
        }*/


       /*  let link1= this.serverUrl+'dealercheck';
        this.http.post(link1,username)
             .subscribe(data2 => {
                  let data3:any = data2.json();
                 console.log(data2);
                 console.log(data3);
                 console.log(data3.length);
                 if(data3.length==0){
                     return { 'invalidEmailAddress': true };
                 }

             }, error => {
                 console.log("Oooops!");
             });*/
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
        this.signupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
         //this.showloader=true;
        if(this.signupform.valid){
            this.showloader=true;

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link1= this.serverUrl+'dealercheck';
            let username={username:this.signupform.value.username};
            this.http.post(link1,username)
                .subscribe(data2 => {
                    let data3:any = data2.json();
                    console.log(data2);
                    console.log(data3);
                    console.log(data3.length);
                    if(data3.length==0){
                       // return { 'invalidEmailAddress': true };

                        let link = this.serverUrl+'adddealer';
                        var submitdata = this.signupform.value;

                        this.http.post(link,submitdata)
                            .subscribe(data => {
                                this.showloader=false;
                                // /this.data1.response = data.json();
                                console.log(data);
                                this.signupform.value.password='';
                                this.userInfo.putObject('userInfo', this.signupform.value);
                                //console.log(this.userInfo.getObject('userInfo'));
                                this.router.navigate(['/creditcard']);

                                //this.local = new Storage(LocalStorageService);
                                // this.local.set('userinfo', JSON.stringify(data.json()));
                                //console.logthis.local.get('userinfo');


                            }, error => {
                                console.log("Oooops!");
                            });
                    }
                    else{
                        this.showloader=false;
                        console.log('Invalid username/password');
                        this.loginerror=0;
                    }

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


