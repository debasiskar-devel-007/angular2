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
import any = jasmine.any;

declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/customeractivitylist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomeractivitylist {
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
    filesrc:any;
    details:any;
    customerinfo:any;
    randstring:any;
    dealerfullname:any;

    cardata:Array<any>;
    private customeractivity:any;
    private customerlist:any;
    private customerlistarr:any;
    private custarr:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
        this.http=http;
        this.customerlist=[];
        this.customeractivity=[];
        this.customerlistarr=[];
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.userInfo=userInfo.getObject('userdetails');
        console.log(this.userInfo);
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        this.cardata=[];
        this.p=1;
        this.orderbyquery='added_on';
        this.orderbytype=-1;
        this.customeractivity=[];
        this.customerlistarr=[];
        this.custarr=[];
        let ids={dealerusername:this.userInfo.username};

        this.http.post(this.serverUrl + 'getcustomeractivitybyusername', ids)
            .subscribe(data => {
                this.customeractivity = data.json();
                console.log('Customer Activity');
                this.customerlistarr=[];
                console.log(this.customeractivity);
                //   this.manageinventory();

              /*  var x:any;
                for(x in this.customeractivity){
                    this.customeractivity[x].customername= this.getcustomername(this.customeractivity[x].username);
                this.customerlistarr.push(this.customeractivity[x]);
                }
                console.log('cus');
                console.log(this.customerlistarr);*/
              this.getcustomername();
                this.pagec=Math.ceil(this.customeractivity.length / 10);
            }, error => {
                console.log("Oooops!");
            });



        let link1s = this.serverUrl + 'customerlist';
        //console.log(link);
        this.http.get(link1s)
            .subscribe(data1 => {
                this.customerlist = data1.json();
                console.log('customer list');
                //alert('customer list');
                console.log(this.customerlistarr);
                //alert(this.customerlistarr.length);
                this.getcustomername();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
            }, error => {
                console.log("Oooops!");
            });

    }




    customerdelete(item:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletecustomebyid';
        let ids={id:'586a517cc595bfab27dfc4e0'};
        this.http.post(link,ids)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                //var index = this.cardata.indexOf(item);
                //console.log(index);
                //let tempdata:Array<any>;
                /* let x:any;
                 for(x in this.data){
                 console.log(this.data[x]._id);
                 console.log('this.data[x]._id');

                 if(item._id==this.data[x]._id) {
                 console.log(x+'.......'+this.data.length);
                 delete this.data.x;
                 this.data.splice(x, 1);
                 console.log(this.data.length);
                 //this.router.navigate(['adminlist']);
                 // window.location.reload();
                 }
                 }*/

                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });


        // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
    }

    changeStatus(item:any){
        var idx = this.cardata.indexOf(item);
        if(this.cardata[idx].is_active==1){
            var is_active=0;
        }
        else{
            var is_active=1;
        }
        let stat={id:item._id,is_active:is_active};
        let link= this.serverUrl+'customerstatuschange';
        this.http.post(link,stat)
            .subscribe(data1 => {

                if(this.cardata[idx].is_active == 0){
                    this.cardata[idx].is_active = 1;
                }else{
                    this.cardata[idx].is_active = 0;
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
    timeConverter(UNIX_timestamp: any) {
        // var a = new Date(UNIX_timestamp * 1000);
        /*     this.a = new Date(UNIX_timestamp);
         this.b = new Date();
         // var a = new Date(UNIX_timestamp * 1000);

         var diff =  Math.abs(this.b-this.a);
         var seconds = Math.floor(diff/1000); //ignore any left over units smaller than a second
         var minutes = Math.floor(seconds/60);
         seconds = seconds % 60;
         var hours = Math.floor(minutes/60);
         return hours;
         */
        var dt = new Date(UNIX_timestamp);
        var month = dt.getMonth() + 1;
        return month + '/' + dt.getDate() + '/' + dt.getFullYear() + ' ' + dt.getHours() + ' : ' + dt.getMinutes() + ' : ' + dt.getSeconds();
    }

getcustomername(){

    this.customerlistarr=[];
    var x:any;
    var y: any;
   // alert('getcustomername() called');
    for(x in this.customeractivity){
        console.log(55555999999);
        console.log(this.customerlist.length);
        for (y in this.customerlist) {
             console.log(7777777777);
            if (this.customeractivity[x].customerid == this.customerlist[y].username) {
                console.log(44442424244);
                //return this.customerlist[y].fname + ' ' + this.customerlist[y].lname ;
                this.customeractivity[x].customername= this.customerlist[y].fname+' '+this.customerlist[y].lname;
                this.customerlistarr.push(this.customeractivity[x]);

            }

        }

      //  alert(this.customerlistarr.length);

    }
    //return this.customerlistarr;

    //console.log(this.customerlistarr);
}
}


