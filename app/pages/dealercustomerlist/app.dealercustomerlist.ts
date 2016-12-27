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
    templateUrl:'app/pages/dealercustomerlist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealercustomerlist {
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
        this.orderbyquery='fname';
        this.orderbytype=-1;
        // alert(link);
        console.log('dealer user name');
        console.log(this.userInfo.username);
        let ids={dealereusername:this.userInfo.username};

        var link = this.serverUrl+'getinventoryforcustomerbydealer?dealerusername='+this.userInfo.username;
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
            });

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


    reviewfinance(item:any){
        console.log('Modal Value ');
        console.log(item);
        this.customerinfo=item;
        if(this.customerinfo.primary_residence_type==1){
            this.customerinfo.primary_residence_type='Own'
        }
        if(this.customerinfo.primary_residence_type==2){
            this.customerinfo.primary_residence_type='Rent'
        }
        if(this.customerinfo.primary_residence_type==3){
            this.customerinfo.primary_residence_type='Others'
        }
        if(this.customerinfo.payment_type==1){
            this.customerinfo.payment_type='Hourly'
        }
        if(this.customerinfo.payment_type==2){
            this.customerinfo.payment_type='Salary'
        }
        if(this.customerinfo.payment_type==3){
            this.customerinfo.payment_type='Other'
        }
        if(this.customerinfo.self_employed==0){
            this.customerinfo.self_employed='No'
        }
        if(this.customerinfo.self_employed==1){
            this.customerinfo.self_employed='Yes'
        }
        if(this.customerinfo.checking_account==1){
            this.customerinfo.checking_account='Yes'
        }
        if(this.customerinfo.checking_account==2){
            this.customerinfo.checking_account='No'
        }
        if(this.customerinfo.saving_account==1){
            this.customerinfo.saving_account='Yes'
        }
        if(this.customerinfo.saving_account==0){
            this.customerinfo.saving_account='No'
        }
        if(this.customerinfo.co_applicant==1){
            this.customerinfo.co_applicant='Yes'
        }
        if(this.customerinfo.co_applicant==2){
            this.customerinfo.co_applicant='No'
        }
        if(this.customerinfo.vehicle_trade==1){
            this.customerinfo.vehicle_trade='Yes'
        }
        if(this.customerinfo.vehicle_trade==2){
            this.customerinfo.vehicle_trade='No'
        }
        if(this.customerinfo.loan_check==1){
            this.customerinfo.loan_check='Yes'
        }
        if(this.customerinfo.loan_check==0){
            this.customerinfo.loan_check='No'
        }

        if(this.customerinfo.finance_check==0){
            this.customerinfo.finance_check='Pending'
        }
        if(this.customerinfo.finance_check==1){
            this.customerinfo.finance_check='Approved'
        }
        if(this.customerinfo.finance_check==2){
            this.customerinfo.finance_check='Decline'
        }

        $('#customerfinanceModal').modal('show');
    }
    customerupdate(){
        let idss={dealerusername:this.userInfo.username};
        this.http.post(this.serverUrl+'updatealldealerfield',idss)
            .subscribe(data => {
                console.log(data);




            }, error => {
                console.log("Oooops!");
            });

}

    financestatuschange(item:any,status:any){
        var idx = this.cardata.indexOf(item);
        console.log('Row');
        console.log(this.cardata[idx]);

        let ids={id:item._id,finance_check:status};
        this.http.post(this.serverUrl+'financestatuschangeofcustomer',ids)
            .subscribe(data => {
                console.log(data);

                if(status==0){
                    this.customerinfo.finance_check='Pending'
                }
                if(status==1){
                    this.customerinfo.finance_check='Approved'
                }
                if(status==2){
                    this.customerinfo.finance_check='Decline'
                }

                if(this.cardata[idx].finance_check == 'Pending'){
                    this.cardata[idx].finance_checktext = 'Pending';
                }
                if(this.cardata[idx].finance_check == 'Approved'){
                    this.cardata[idx].finance_checktext = 'Approved';
                }
                if(this.cardata[idx].finance_check == 'Decline'){
                    this.cardata[idx].finance_checktext = 'Decline';
                }
                //this.cardata.finance_check=status;

            }, error => {
                console.log("Oooops!");
            });
    }
}


