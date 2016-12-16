import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, OnInit} from '@angular/core';
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


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/addauction/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddauction implements OnInit {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};
    myModal :ModalModule;
    addauctionform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    getusastates:any;
    uploadedfilesrc:any;
    ckeditorContent:any;
    private userInfo:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.ckeditorContent = '';
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userInfo.getObject('userdetails');
console.log(this.userInfo);
        this.addauctionform = fb.group({
            username: [this.userInfo.username, Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            is_active: [''],
            priority: ['', Validators.required],
            filename: ['', Validators.required],

        });


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
                    this.addauctionform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }

    onChange(event:any){
        //alert(99);
        //(<FormControl>this.addadminform.controls['body']).updateValue(this.ckeditorContent);
        this.addauctionform.patchValue({description: this.ckeditorContent});

    }

    submitform1(){

        let x:any;
        for(x in this.addauctionform.controls){
            this.addauctionform.controls[x].markAsTouched();

        }
        this.addauctionform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.addauctionform.valid){
            console.log(11);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'addauction';
            var submitdata = this.addauctionform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                 //   this.data=data.json();
                   // console.log(this.data);
                     this.router.navigateByUrl('/auctionlist(adminheader:adminheader//adminfooter:adminfooter)');

                }, error => {
                    console.log("Oooops!");
                });
        }
    }


 

}


