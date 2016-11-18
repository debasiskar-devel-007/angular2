import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnDestroy, OnInit,
    NgZone
} from '@angular/core';
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
    templateUrl:'app/pages/dealerprofile/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerprofile implements OnInit{
    // /@ViewChild(Modal) modal;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};

    addadminform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    id: number;
    private sub: any;
    dealerprofiledetails: any;
    appcomponent:AppComponent;
    private userInfo:any;
    uploadedfilesrc:any;
    userinfo:any;
    file_name:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,router: Router ,private route: ActivatedRoute,appcomponent:AppComponent,userInfo:CookieService) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userInfo;
        this.userinfo=userInfo.getObject('userdetails');
        this.file_name='';

       console.log(this.userinfo);
       console.log(this.serverUrl+'editdealer');
            let ids={id:this.userinfo.id};
            this.http.post(this.serverUrl+'editdealer',ids)
                .subscribe(data => {

                    this.dealerprofiledetails=data.json()[0];
                     console.log(this.dealerprofiledetails);
                   // console.log(this.dealerprofiledetails.filename);
                    if(this.dealerprofiledetails.filename!=undefined) {
                        this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.dealerprofiledetails.filename;
                        this.file_name=this.dealerprofiledetails.filename;
                    }
                    else{
                        this.file_name='';
                    }
                    this.addadminform = fb.group({
                        username: [this.dealerprofiledetails.username, Validators.required],
                        //password: ["", Validators.required],
                        id: [this.dealerprofiledetails._id, Validators.required],
                        fname: [this.dealerprofiledetails.fname, Validators.required],
                        lname: [this.dealerprofiledetails.lname, Validators.required],
                        email: [this.dealerprofiledetails.email, AppDealerprofile.validateEmail],
                        address: [this.dealerprofiledetails.address, Validators.required],
                        city: [this.dealerprofiledetails.city, Validators.required],
                        state: [this.dealerprofiledetails.state, Validators.required],
                        phone: [this.dealerprofiledetails.phone, Validators.required],
                        zip: [this.dealerprofiledetails.zip, Validators.required],
                        is_active: [this.dealerprofiledetails.is_active],
                        filename: [this.file_name]
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
       

       // this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                this.getusastates=data.json();
console.log(this.getusastates);

            }, error => {
                console.log("Oooops!");
            });

        this.addadminform = fb.group({
            //password: ["", Validators.required],
           // username: [this.dealerprofiledetails.username, Validators.required],
            fname: ['', Validators.required],
            lname: ["", Validators.required],
            email: ["", AppDealerprofile.validateEmail],
            address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            is_active: [""],
            filename: [""],
        });

        //this.router.navigate(['/about']);




    }

    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }

    handleUpload(data: any): void
    {

        //console.log(data.progress.percent);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent ;
            if(data.progress.percent==100){
                console.log(data.response);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.addadminform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }


    static validateTerms(control: FormControl){
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
     }

    static validateEmail(control: FormControl){

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
        this.addadminform.markAsDirty();
        if(this.addadminform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatedealerprofile';
            var submitdata = this.addadminform.value;
           // console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    //this.appcomponent.putmessages('Dealer profile  '+this.dealerprofiledetails.username+' updated successfully','success');
                    //this.appcomponent.putmessages(this.dealerprofiledetails.username+' updated successfully ......','success');
                    let userdet={id:this.addadminform.value.id,username:this.addadminform.value.username,useremail:this.addadminform.value.email,userrole:'dealer',userfullname:this.addadminform.value.fname+' '+this.addadminform.value.lname,filename:this.addadminform.value.filename}

                    console.log(userdet);
                    this.userInfo.putObject('userdetails', userdet);
                    window.location.reload();

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


