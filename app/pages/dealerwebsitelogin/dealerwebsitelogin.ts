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
    templateUrl:'app/pages/dealerwebsitelogin/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerWebsiteLogin{
    // /@ViewChild(Modal) modal;
    adminloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private userdetails:CookieService;
    userDetails:any;
    sub:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router,private route: ActivatedRoute ) {

        this.items = commonservices.getItems();
        this.serverUrl=this.items[0].serverUrl;
        this.userdetails=userdetails;
        this.userDetails=userdetails.getObject('userdetails');
        this.http=http;
        this.router=router;

        if(window.location.hostname!='probiddealer.influxiq.com'){
            //alert(9);

            this.sub = this.route.params.subscribe(params => {
                //this.id = params['id']; // (+) converts string 'id' to a number
                console.log(params);
                //alert(window.parent.location);
                if(typeof (params['id'])!='undefined'){

                    let link = this.serverUrl+'dealerautologin';
                    var submitdata = {username:params['id']};

                    this.http.post(link,submitdata)
                        .subscribe(data => {
                            // this.data1.response = data.json();

                            console.log(data.json());

                            var res=data.json();
                            if(res.length>0){
                                console.log();
                                var userdet={username:res[0].username,useremail:res[0].email,userrole:'dealer',userfullname:res[0].fname+' '+res[0].lname}

                                console.log('Login successfully');
                                this.userdetails.putObject('userdetails', userdet);
                                this.loginerror=1;
                                this.router.navigateByUrl('/dealerdashboard(dealerheader:dealerheader//dealerfooter:dealerfooter)');
                                //window.location.href="http://"+res[0].username+".probidauto.com/#/dealerautologin/"+res[0]._id;


                            }
                            else{
                                console.log('UsernameInvalid username/password');
                                this.loginerror=0;
                            }

                        }, error => {
                            console.log("Oooops!");
                        });

                    return;
                }

                // In a real app: dispatch action to load the details here.
            });
        }

        this.adminloginform = fb.group({

            //term: ["", AppCreditcard.validateTerms]
            username: ["", Validators.required],
            password: ["", Validators.required]

        });

        if(typeof(this.userDetails)!='undefined'){
            //this.router.navigateByUrl('/admindashboard(adminheader:adminheader//adminfooter:adminfooter)');
            //return;
        }

    }



    submitform(){
        //this.signupform.set;
        let x:any;
   //     console.log(this.dealerloginform.value.term);

        for(x in this.adminloginform.controls){
            this.adminloginform.controls[x].markAsTouched();

        }
       // console.log(this.dealerloginform.dirty);
        this.adminloginform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
       if(this.adminloginform.valid){
            let link = this.serverUrl+'usercheck';
            var submitdata = this.adminloginform.value;

            this.http.post(link,submitdata)
                .subscribe(data => {
                   // this.data1.response = data.json();

                    console.log(data.json());

                var res=data.json();
                    if(res.length>0){
console.log();
                        var userdet={username:res[0].username,useremail:res[0].email,userrole:'dealer',userfullname:res[0].fname+' '+res[0].lname}

                        console.log('Login successfully');
                        this.userdetails.putObject('userdetails', userdet);
                        this.loginerror=1;
                        //this.router.navigateByUrl('/admindashboard(adminheader:adminheader//adminfooter:adminfooter)');
                        window.location.href="http://"+res[0].username+".probidauto.com/#/dealerautologin/"+res[0].username;


                    }
                    else{
                        console.log('UsernameInvalid username/password');
                        this.loginerror=0;
                    }

                }, error => {
                    console.log("Oooops!");
                });


        }
    }

    goadmindashboard(){
        this.router.navigateByUrl('/admindashboard(adminheader:adminheader//adminfooter:adminfooter)');
    }
    addadmin(){
        this.router.navigateByUrl('/addadmin(adminheader:adminheader//adminfooter:adminfooter)')
    }

}


