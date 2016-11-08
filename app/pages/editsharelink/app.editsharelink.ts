import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, NgZone,
    OnDestroy
} from '@angular/core';
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
    templateUrl:'app/pages/editsharelink/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditsharelink implements OnInit, OnDestroy{
    // /@ViewChild(Modal) modal;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};
    addsharelinkform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getusastates:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private userInfo:CookieService;
    private router: Router;
    uploadedfilesrc:any;
    id: number;
    private sub: any;
    sharemediadetails: any;
    text:any;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        console.log(this.items);
        console.log(this.items[0].serverUrl);
        this.text='trtrtrtrt';
        this.serverUrl = this.items[0].serverUrl;
 /*       this.sharemediadetails={
            name:"",
            description: "",
            url: "",
            filename: "",
            priority: "",
            is_public: ""
        }*/
        this.addsharelinkform = fb.group({
            name: ["", Validators.required],
            description: ["", Validators.required],
            url: ["", Validators.required],
            filename: ["", Validators.required],
            priority: ["", Validators.required],
            is_public: [""]
        });
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'editsharemedia',ids)
                .subscribe(data => {
                    console.log(data);
                    this.sharemediadetails=data.json()[0];
                    this.uploadedfilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.sharemediadetails.filename;
                    this.addsharelinkform = fb.group({
                        name: [this.sharemediadetails.name, Validators.required],
                        _id: [this.sharemediadetails._id, Validators.required],
                        description: [this.sharemediadetails.description, Validators.required],
                        url: [this.sharemediadetails.url, Validators.required],
                        filename: [this.sharemediadetails.filename, Validators.required],
                        priority: [this.sharemediadetails.priority, Validators.required],
                        is_public: [this.sharemediadetails.is_public, Validators.required]
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });


        //this.router.navigate(['/about']);
    }


    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            console.log((this.id));

            // In a real app: dispatch action to load the details here.
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
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
                    this.addsharelinkform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }


    submitform(){
        let x:any;
        for(x in this.addsharelinkform.controls){
            this.addsharelinkform.controls[x].markAsTouched();

        }
       // console.log(this.addsharelinkform.dirty);
        this.addsharelinkform.markAsDirty();
        if(this.addsharelinkform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatesharemedia';
            var submitdata = this.addsharelinkform.value;
            console.log(submitdata);
            console.log(link);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    console.log(344444);
                   // this.data = data.json();
                    //console.log(this.data);
                    this.router.navigateByUrl('/sharemedia(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


