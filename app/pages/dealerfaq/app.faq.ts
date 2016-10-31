import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import  {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/faq/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerFaq {
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
    private userdetails:CookieService;
    private userInfo:any;
    id:any;
    item:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router ,appcomponent:AppComponent ) {
        this.router = router;
        this.http = http;
        this.router = router;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl + 'dealerfaqlist';
        this.p=1;
        this.userInfo=userdetails.getObject('userdetails');
        this.orderbyquery='added_on';
        this.orderbytype=-1;
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                console.log(this.data);
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });
        // alert(link);


    }

    faq(){
        this.router.navigateByUrl('/faq(adminheader:adminheader//adminfooter:adminfooter)');

    }

    updatefaqstatus(val:any,item:any){

        let link1 = this.serverUrl + 'updatefaqstatus?id='+item._id+'&value='+val;
        //this.p=1;
        this.http.get(link1)
            .subscribe(data2 => {
                this.data = data2.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                //console.log(this.data);
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });


    }

    deletefaq(adminid:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletefaq';
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
                this.appcomponent.putmessages('Faq '+adminid.title+' deleted successfully','success');
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });


        // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
    }


}


