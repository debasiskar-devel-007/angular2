import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";
import {DomSanitizer} from "@angular/platform-browser";
//import {ClipboardDirective} from './clipboard.directive';




@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/orderdetails/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppOrderdetails implements OnInit, OnDestroy{

    // /@ViewChild(Modal) modal;
    addaffiliateform: FormGroup;
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
    orderdetails1: any;
    name: any;
    free_member: any;
    extra_cost: any;
    package_image: any;
    package_date: any;
    package_id: any;
    package_description: any;
    appcomponent:AppComponent;



    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userInfo:CookieService ,router: Router,private route: ActivatedRoute,appcomponent:AppComponent,private _sanitizer: DomSanitizer ) {

        this.items = commonservices.getItems();
        this.http = http;
        this.router = router;
        this.userInfo = userInfo;
        this.serverUrl = this.items[0].serverUrl;
        this.commonservices=commonservices;

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids = {id: this.id};
            this.http.post(this.serverUrl + 'dealerordermember', ids)
                .subscribe(data => {
                    this.orderdetails1 = data.json()[0];
                    console.log()
                    this.name=this.orderdetails1.name;
                    this.extra_cost=this.orderdetails1.cost_extra_member;
                    this.package_date=this.orderdetails1.added_on;
                    this.package_id=this.orderdetails1.packageid;
                    this.package_description=this.orderdetails1.description;
                    this.free_member=this.orderdetails1.free_member;
                    this.package_image="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.orderdetails1.filename;
                }, error => {
                    console.log("Oooops!");
                });


        });
        //this.router.navigate(['/about']);
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}


