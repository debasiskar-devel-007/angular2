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
//import {AppComponent} from "../home/app.component";




@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editcarfeature/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditcarfeature  implements OnInit, OnDestroy {
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
    private userInfo:CookieService;
    private router: Router;
    id: number;
    private sub: any;
    details: any;
    //appcomponent:AppComponent;
    uploadedfilesrc:any;

    // private addpurchasetime;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        this.serverUrl = this.items[0].serverUrl;

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getcarfeaturebyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                    console.log(this.details);
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.logo;
                    this.addadminform = fb.group({
                        feature: [this.details.feature, Validators.required],
                        priority: [this.details.priority, Validators.required],
                        logo: [this.details.logo, Validators.required],
                        id: [this.details._id, Validators.required],
                        is_active: [this.details.is_active]
                    });
console.log(this.addadminform );

                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

        this.addadminform = fb.group({
            feature: ["", Validators.required],
            logo: ["", Validators.required],
            priority: ["", Validators.required],
            is_active: [""]
        });
    }

   handleUpload(data: any): void {
        //console.log(data.progress.percent);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent ;
            if(data.progress.percent==100){
                console.log(data.response);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.addadminform.patchValue({logo: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });

        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    submitform(){
        let x:any;
        for(x in this.addadminform.controls){
            this.addadminform.controls[x].markAsTouched();

        }
        this.addadminform.markAsDirty();
        if(this.addadminform.valid){
            let link = this.serverUrl+'updatecarfeature';
            var submitdata = this.addadminform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.router.navigateByUrl('/carfeaturelist(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}


