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
    templateUrl:'app/pages/addsharelink/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddsharelink {
    // /@ViewChild(Modal) modal;
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


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;
        console.log(this.items);
        console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;
        this.addsharelinkform = fb.group({
            name: ["", Validators.required],
            description: ["", Validators.required],
            url: ["", Validators.required],
            filename: ["", Validators.required],
            imageurl: ["", Validators.required],
            priority: ["", Validators.required],
            is_public: [""]
        });

        //this.router.navigate(['/about']);
    }


    submitform(){
        let x:any;
        for(x in this.addsharelinkform.controls){
            this.addsharelinkform.controls[x].markAsTouched();

        }
        console.log(this.addsharelinkform.dirty);
        this.addsharelinkform.markAsDirty();
        if(this.addsharelinkform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'addsharelink';
            var submitdata = this.addsharelinkform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                  //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


