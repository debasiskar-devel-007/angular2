import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation,OnInit, NgZone} from '@angular/core';
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
    templateUrl:'app/pages/editbannersize/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditbannersize {

    // /@ViewChild(Modal) modal;
    addbannersizeform: FormGroup;
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
    bannersizedetails: any;
    text:any;




    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        this.serverUrl = this.items[0].serverUrl;
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'editbannersize',ids)
                .subscribe(data => {
                    console.log(data);
                    this.bannersizedetails=data.json()[0];
                    this.addbannersizeform = fb.group({
                        sizename: [this.bannersizedetails.sizename, Validators.required],
                        _id: [this.bannersizedetails._id, Validators.required],
                        height: [this.bannersizedetails.height, Validators.required],
                        width: [this.bannersizedetails.width, Validators.required],
                    });


                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });



        this.addbannersizeform = fb.group({
            sizename: ["", Validators.required],
            height: ["", Validators.required],
            width: ["", Validators.required]
        });

        //this.router.navigate(['/about']);
    }




    submitform(){
        let x:any;
        for(x in this.addbannersizeform.controls){
            this.addbannersizeform.controls[x].markAsTouched();

        }
       // console.log(this.addsharelinkform.dirty);
        this.addbannersizeform.markAsDirty();
        if(this.addbannersizeform.valid){
           let link = this.serverUrl+'updatebannersize';
            var submitdata = this.addbannersizeform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    console.log(344444);
                   // this.data = data.json();
                    //console.log(this.data);
                    this.router.navigateByUrl('/bannersizelist');
                    //this.router.navigateByUrl('/sharemedia(adminheader:adminheader//adminfooter:adminfooter)');

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


