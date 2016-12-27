import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, NgZone} from '@angular/core';
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
    templateUrl:'app/pages/addcarlogo/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddcarlogo implements OnInit{
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
    getbannersizelist:any;
    getsharemedialist:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private userInfo:CookieService;
    private router: Router;
    uploadedfilesrc:any;



    constructor(fb: FormBuilder , http:Http ,commonservices: 