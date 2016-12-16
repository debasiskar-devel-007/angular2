import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
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
    templateUrl:'app/pages/retailcommissionlist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppRetailcommissionlist {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private userInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl+'getretailcommissionlist';


        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')


            }, error => {
                console.log("Oooops!");
            });

    }







}


