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
    private userInfo:CookieService;
    private userdetails:any;
    package_image:any;
    details1:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router ) {

        this.items = commonservices.getItems();
        this.serverUrl=this.items[0].serverUrl;
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        //this.userdetails=userdetails;
        this.userdetails=userInfo.getObject('userdetails');
        this.package_image ="images/re_logo2.png";
        var parts = location.hostname.split('.');
        var sndleveldomain = parts[0];
console.log(sndleveldomain);
        let ids = {username: sndleveldomain};
        this.http.post(this.serverUrl + 'editdealerbyusername', ids)
            .subscribe(data => {
                this.details1 = data.json()[0];
                console.log(this.details1);
                if(typeof(this.details1.filename)!='undefined') {
                    this.package_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.filename;
                }
                else {
                    this.package_image ="images/re_logo2.png";
                }

            }, error => {
                console.log("Oooops!");
            });


        this.customerloginform = fb.group({

            //term: ["", AppCreditcard.validateTerms]
            username: ["", Validators.required],
            password: ["", Validators.required]

        });
        console.log(this.userdetails);

        if(typeof(this.userdetails)!='undefined'){
            this.router.navigateByUrl('/customerdashboard(customerheader:customerheader//adminfooter:adminfooter)');
            return;
        }
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
            let link = this.serverUrl+'customercheck';
            var submitdata = this.customerloginform.value;

            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();

                    console.log(data.json());

                var res=data.json();
                    if(res.length>0){
                        var filename= 'images/logo_61.png';
                        if(res[0].filename!='undefined'){
                            filename=res[0].filename;
                        }
                        var userdet={username:res[0].username,useremail:res[0].email,userrole:'customer',userfullname:res[0].fname+' '+res[0].lname,filename:filename,dealerusername:res[0].dealerusername};

                        console.log('Login successfully');
                        this.userInfo.putObject('userdetails', userdet);
                        console.log('Login successfully');
                        this.loginerror=1;
                        this.router.navigateByUrl('/customerdashboard(customerheader:customerheader//customerfooter:customerfooter)');
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


