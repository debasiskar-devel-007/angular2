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
    templateUrl:'app/pages/dealerpackagepurchase/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerpackagepurchase {
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
    userinfo:any;
    freemember:any;
    userdetails:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
       // this.data='';
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.userinfo=userInfo.getObject('userdetails');
        this.data=[];

        this.serverUrl = this.items[0].serverUrl;

        let ids={username:this.userinfo.username};
        this.http.post(this.serverUrl+'editdealerbyusername',ids)
            .subscribe(data => {
               // this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.userdetails=data.json()[0];
                this.freemember=this.userdetails.free_member;
                console.log(this.userdetails);
                //console.log(this.details);
               // this.manageinventory();


            }, error => {
                console.log("Oooops!");
            });
        //dealerusername


        var link = this.serverUrl+'dealermembershiporderpackagelist?dealerusername='+this.userinfo.username;
        this.p=1;
        this.orderbyquery='added_on';
        this.orderbytype=-1;
        // alert(link);
       this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                console.log(this.data);
                console.log(5454545);
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });

    }


    deletedealerpckage(item:any){
        //console.log(adminid);

        let link= this.serverUrl+'updatealldealerfield';
        let id={dealerusername:'payel'};
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');


                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });


        // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
    }

   changeStatus(item:any){
    var idx = this.data.indexOf(item);
    if(this.data[idx].is_active==1){
        var is_active=0;
    }
    else{
        var is_active=1;
    }
   let stat={id:item._id,is_active:is_active};
       let link= this.serverUrl+'membershiporderstatuschange';
       this.http.post(link,stat)
           .subscribe(data1 => {
               // this.data = data1.json();
               //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
               if(this.data[idx].is_active == 0){
                   this.data[idx].is_active = 1;
               }else{
                   this.data[idx].is_active = 0;
               }
           }, error => {
               console.log("Oooops!");
           });


}
    getSortClass(value:any){
     //   console.log(value);
        if(this.orderbyquery==value && this.orderbytype==-1) {
          //  console.log('caret-up');
            return 'caret-up'
        }

        if(this.orderbyquery==value && this.orderbytype==1) {
           // console.log('caret-up');
            return 'caret-down'
        }
        return 'caret-up-down'
    }
    manageSorting(value:any){
      //  console.log(value);
        if(this.orderbyquery==value && this.orderbytype==-1) {
            this.orderbytype=1;
            return;
        }
        if(this.orderbyquery==value && this.orderbytype==1) {
            this.orderbytype=-1;
            return;
        }

        this.orderbyquery=value;
        this.orderbytype=-1;
    }




}


