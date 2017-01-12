import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';

declare var $: any;
@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/managesocialaccounts/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppManagesocialaccounts {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    loginerror:any;
    userDetails:any;
    uploadedfilesrc:any;
    coockieData:CookieService;
    private customerlist: any;
    private dealerlist: any;
    private messageaar: Array<any>;
    private messageaarpub:any;
    private breaklog1:any;
    private breaklog:any;
    datamsg:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router  ) {
       // this.uploadedfilesrc='';
        this.items = commonservices.getItems();
        this.http=http;
        this.serverUrl = this.items[0].serverUrl;
        this.coockieData=userdetails;
        this.userDetails=userdetails.getObject('userdetails');
        this.router=router;
        this.messageaar=[];
        this.messageaarpub=[];
        this.dealerlist=[];
        this.breaklog1=0;
        this.breaklog=0;
        this.customerlist=[];


        let linkmessage = this.serverUrl+'messagelist';
        this.http.get(linkmessage)
            .subscribe(data1 => {
                this.datamsg = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
               // this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                /*               console.log(' message list ...');
                 console.log(this.data);
                 console.log(this.data.length);*/
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        console.log('User Info');
       // images/img_customersignup_car.png
        console.log(this.userDetails.filename);
        this.uploadedfilesrc= 'images/logo_61.png';
        if(this.userDetails.filename!='undefined'){
            this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.userDetails.filename;
        }
        else{
            this.uploadedfilesrc= 'images/logo_61.png';
        }


        let linkcustomer = this.serverUrl+'customerlist';
        // console.log(link);
        this.http.get(linkcustomer)
            .subscribe(data1 => {
                this.customerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                //this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                //console.log(' customer list ...');
                // console.log(this.customerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        let linkdealer = this.serverUrl+'dealerlist';
        // console.log(link);
        this.http.get(linkdealer)
            .subscribe(data1 => {
                this.dealerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

    }
    private makemessagelist() {
        // if(this.dealerlist.length>0 && this.customerlist.length>0) {
        this.messageaar = [];
        this.messageaarpub=[];
        var x: any;
        for (x in this.datamsg) {
            if(this.datamsg[x].parentid!=0) this.datamsg[x]._id=this.datamsg[x].parentid;
            if (this.datamsg[x].to == this.userDetails.username) {
                this.datamsg[x].fromfullname = this.getuserinfo(this.datamsg[x].from);
                this.messageaar[this.datamsg[x]._id]=(this.datamsg[x]);
            }
        }

        for ( var key in this.messageaar ){
            this.messageaarpub.push(this.messageaar[key]);
        }
        console.log('message length');
        console.log(this.messageaarpub.length);
    }
    private getuserinfo(from:any) {
        var y:any;
        for(y in this.customerlist){
            this.breaklog++;

            if(from==this.customerlist[y].username){
                return this.customerlist[y].fname+' '+this.customerlist[y].lname+' ( '+this.customerlist[y].username+' ) ';
            }

        }
        var z:any;
        for(z in this.dealerlist){
            this.breaklog1++;

            if(from==this.dealerlist[z].username){
                return this.dealerlist[z].fname+' '+this.dealerlist[z].lname+' ( '+this.dealerlist[z].username+' ) ';
            }

        }

        return '';

    }
    connectfacebook(){
        alert(6);
        FB.getLoginStatus(function(response:any) {
            if (response.status === 'connected') {
                console.log('Logged in.');
                console.log(response.authResponse);
                console.log(response.authResponse.accessToken);
                FB.api('/me/feed', 'post', {message: 'Hello, world!'});
            }
            else {
                alert(7);
                //FB.login();
                FB.login(function(responses:any) {
                    // handle the response
                }, {scope: 'email'});
            }
        });
    }

}


