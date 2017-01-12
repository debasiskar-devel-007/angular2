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
    templateUrl:'app/pages/affiliatereport/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAffiliatereport {
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

    cardata:Array<any>;

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
        this.cardata=[];
        this.p=1;
        this.orderbyquery='affiliatename';
        this.orderbytype=1;
        // alert(link);
        console.log('dealer user name');
        console.log(this.userInfo.username);
        let ids={dealereusername:this.userInfo.username};

       /* var link = this.serverUrl+'getinventoryforcustomerbydealer?dealerusername='+this.userInfo.username;
        this.http.get(link)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.data=data.json();
                console.log('data');
                console.log(this.data.length);
                var x:any;

                for (x in this.data){
                    this.data[x].sharefilesrc='images/logo_61.png';
                    if(this.data[x].filename) {
                        this.data[x].sharefilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.data[x].filename;
                    }
                    if(this.data[x].finance_check==0){
                        this.data[x].finance_checktext='Pending'
                    }
                    if(this.data[x].finance_check==1){
                        this.data[x].finance_checktext='Approved'
                    }
                    if(this.data[x].finance_check==2){
                        this.data[x].finance_checktext='Decline'
                    }
                    //this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                    this.cardata.push(this.data[x]);
                }
                console.log('view customer data');
                console.log(this.cardata);
                this.pagec=Math.ceil(this.cardata.length / 10);


            }, error => {
                console.log("Oooops!");
            });*/
        this.cardata=[
            {id: 1, affiliatename: 'sirin samrin',totalclick:4,totalsignup:3,sales:'3/66,300 USD'},
            {id: 2, affiliatename: 'ritu pal',totalclick:5,totalsignup:4,sales:'4/47,996 USD'},
            {id: 3, affiliatename: 'abir1 sen',totalclick:4,totalsignup:3,sales:'3/50,500 USD'},
            {id: 4, affiliatename: 'rosan perera',totalclick:6,totalsignup:6,sales:'6/77,946 USD'},
            {id: 5, affiliatename: 'stuart din',totalclick:7,totalsignup:4,sales:'4/88,400 USD'},
            {id: 6, affiliatename: 'prabal pal',totalclick:3,totalsignup:3,sales:'3/78,800 USD'},
            {id: 7, affiliatename: 'rose alen',totalclick:7,totalsignup:3,sales:'3/65,460 USD'},
            {id: 8, affiliatename: 'paul bolak',totalclick:4,totalsignup:3,sales:'3/87,760 USD'},
            {id: 9, affiliatename: 'donald saly',totalclick:6,totalsignup:5,sales:'5/1,13860 USD'},
            {id: 10, affiliatename: 'grame smit',totalclick:4,totalsignup:4,sales:'4/54,368 USD'},
            {id: 11, affiliatename: 'lorel rose',totalclick:5,totalsignup:3,sales:'3/48,699 USD'},
            ];

        this.pagec=Math.ceil(this.cardata.length / 10);

    }


    customerdelete(item:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletecustomebyid';
        let ids={id:item._id};
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

    openclickreport(){
        $('#affiliateclickModal1').modal('show');
    }
    opensignupreport(){
        $('#affiliatesignupModal').modal('show');
    }
  }


