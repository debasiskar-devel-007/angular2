import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, NgZone} from '@angular/core';
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
    templateUrl:'app/pages/editbanner/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditbanner implements OnInit{
    // /@ViewChild(Modal) modal;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};

    addbannerform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    getbannersizelist:any;
    getsharemedialist:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private userInfo:CookieService;
    private router: Router;
    uploadedfilesrc:any;
    id: number;
    private sub: any;
    bannerdetails: any;
    text:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        //console.log(this.items);
       // console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getbannersizelist')
            .subscribe(data => {
               // console.log(data);
                this.getbannersizelist=data.json();

            }, error => {
                console.log("Oooops!");
            });
       this.http.get(this.serverUrl+'sharemedialist')
            .subscribe(data => {
                //console.log(data);
                this.getsharemedialist=data.json();

            }, error => {
                console.log("Oooops!");
            });
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'editbanner',ids)
                .subscribe(data => {
                    console.log(data);
                    this.bannerdetails=data.json()[0];
                    this.uploadedfilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.bannerdetails.filename;
                    this.addbannerform = fb.group({
                        bannername: [this.bannerdetails.bannername, Validators.required],
                        _id: [this.bannerdetails._id, Validators.required],
                        filename: [this.bannerdetails.filename, Validators.required],
                        bannersize: [this.bannerdetails.bannersize, Validators.required],
                        sharelink: [this.bannerdetails.sharelink, Validators.required],
                        priority: [this.bannerdetails.priority, Validators.required],
                        is_active: [this.bannerdetails.is_active],
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });



        this.addbannerform = fb.group({
            bannername: ["", Validators.required],
            bannersize: ["", Validators.required],
            sharelink: ["", Validators.required],
            filename: ["", Validators.required],
            priority: ["", Validators.required],
            is_active: [""]
        });

        //this.router.navigate(['/about']);
    }


    static validateTerms(control: FormControl){
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
     }

    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
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
                    this.addbannerform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }

    submitform(){
        let x:any;
        for(x in this.addbannerform.controls){
            this.addbannerform.controls[x].markAsTouched();

        }
        this.addbannerform.markAsDirty();
        if(this.addbannerform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatebanner';
            var submitdata = this.addbannerform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.router.navigateByUrl('/bannerlist(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


