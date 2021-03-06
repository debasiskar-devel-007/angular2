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
    templateUrl:'app/pages/affiliatelist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAffiliatelist {
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
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    private userInfo:any;
    ids:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.userInfo=userInfo.getObject('userdetails');

        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        console.log(this.messages);
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl+'affiliatelist';
        this.p=1;
        this.orderbyquery='fname';
        this.orderbytype=-1;
        // alert(link);
        let ids={dealereusername:this.userInfo.username};
       this.http.post(link,ids)
            .subscribe(data1 => {
                this.data = data1.json();
                console.log(this.data);
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                console.log(this.data);
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });

    }


    deleterow(adminid:any){
        //console.log(adminid);

        let link= this.serverUrl+'deleteaffiliate';
        let id=adminid;
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                var index = this.data.indexOf(id.id);
                console.log(index);
                //let tempdata:Array<any>;
                let x:any;
                for(x in this.data){
                    console.log(this.data[x]._id);
                    console.log('this.data[x]._id');
                    console.log(adminid._id);
                    if(adminid._id==this.data[x]._id) {
                        console.log(x+'.......'+this.data.length);
                        delete this.data.x;
                        this.data.splice(x, 1);
                        console.log(this.data.length);
                        //this.router.navigate(['adminlist']);
                        window.location.reload();
                    }
                }
                console.log(this.data);
                //this.data=this.tempdata;
                //this.data.splice(index, 1);
                this.appcomponent.putmessages('Affiliate user '+adminid.username+' deleted successfully','success');
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
       let link= this.serverUrl+'affiliatestatuschange';
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
        console.log(value);
        if(this.orderbyquery==value && this.orderbytype==-1) {
            console.log('caret-up');
            return 'caret-up'
        }

        if(this.orderbyquery==value && this.orderbytype==1) {
            console.log('caret-up');
            return 'caret-down'
        }
        return 'caret-up-down'
    }
    manageSorting(value:any){
        console.log(value);
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


