import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation,OnInit, NgZone} from '@angular/core';
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
    templateUrl:'app/pages/addupcomingauction/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddupcomingauction {
    // /@ViewChild(Modal) modal;
    addupcomingauctionform: FormGroup;
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
    auctionlist:any;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.userInfo=userInfo;

        this.serverUrl = this.items[0].serverUrl;


        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data => {
                //console.log(data);
                this.auctionlist=data.json();




            }, error => {
                console.log("Oooops!");
                //return '22';
            });
        this.addupcomingauctionform = fb.group({
            name: ["", Validators.required],
            auctiondate: ["", Validators.required],
            auctionid: ["", Validators.required],
            is_active: [""],
        });

        //this.router.navigate(['/about']);
    }




    submitform(){
        let x:any;
        for(x in this.addupcomingauctionform.controls){
            this.addupcomingauctionform.controls[x].markAsTouched();

        }
       // console.log(this.addsharelinkform.dirty);
        this.addupcomingauctionform.markAsDirty();
        if(this.addupcomingauctionform.valid){
           let link = this.serverUrl+'addupcomingauction';
            var submitdata = this.addupcomingauctionform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    console.log(344444);
                   // this.data = data.json();
                    //console.log(this.data);
                   // this.router.navigateByUrl('/bannersizelist');
                    this.router.navigateByUrl('/sharemedia(adminheader:adminheader//adminfooter:adminfooter)');

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }

}


