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
    templateUrl:'app/pages/customerdashboard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerdashboard {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    userDetails:any;
    details12:any;
    private router: Router;
    details1:any;
    banner_image:any;
    name:any;
    zip:any;
    description:any;
    address1:any;
    city:any;
    state:any;
    phone:any;
    websiteurl:any;
    email:any;
    username:any;
    filesrc:any;
    sharefilesrc:any;
    carlogolist:any;
    carautoyearlist:any;
    carmileagelist:any;
    colorlist:any;
    carlistarr:any;
    auctionlistarr:any;
    details:any;
    dealerid:any;
    private query_model:any;
    private query_auction:any;
    private query_make:any;
    private query_year:any;
    private query:any;
    private inventorymatcharr:Array<any>;
    private orderbyqueryinventorymatch:any;
    private orderbytypeinventorymatch:any;

    p:any;
    pagec:any;
    cardata:Array<any>;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router) {

        this.details12='';
        this.details1='';
        this.banner_image= 'images/img_customersignup_car.png';
        this.items = commonservices.getItems();
        this.router=router;
        this.userDetails=userdetails.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
        this.query_model=0;
        this.query_auction=0;
        this.query_make=0;
        this.query_year=0;
        this.inventorymatcharr=[];
        this.orderbyqueryinventorymatch='inventorymatchval';
        this.orderbytypeinventorymatch=-1;
        this.p=1;
        this.cardata=[];
        // console.log(userdetails.getObject('userdetails'));
        this.http=http;
        let idss = {username: this.userDetails.username};
        this.http.post(this.serverUrl + 'editdcustomerbyusername', idss)
            .subscribe(data2 => {

                 this.details12 = data2.json()[0];

                let ids = {username: this.details12.dealerusername};
                this.http.post(this.serverUrl + 'editdealerbyusername', ids)
                    .subscribe(data => {



                        this.details1 = data.json()[0];
                        console.log('Dealer details');
                        console.log(this.details1);
                        this.dealerid=this.details1._id;
                        this.name=this.details1.fname+' '+this.details1.lname;
                        this.description=this.details1.description;
                        this.address1=this.details1.address;
                      //  console.log(this.address1);
                        this.city=this.details1.city;
                        this.state=this.details1.state;
                        this.zip=this.details1.zip;
                        this.phone=this.details1.phone;
                        this.websiteurl=this.details1.websiteurl;
                        this.email=this.details1.email;
                       // console.log(this.details1);
                        if(this.details1.banner) {
                            this.banner_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.banner;
                        }   else{
                            this.banner_image= 'images/img_customersignup_car.png';
                        }


                        let link='';
                        link = this.serverUrl+'getinventoryfordealer?dealerid='+this.dealerid;
                        console.log('link ==='+link);
                        this.http.get(link)
                            .subscribe(data1 => {
                                this.data = data1.json();
                                var x:any;
                                var y:any;
                                for (x in this.data){
                                    for(y in this.data[x].cardata){

                                        this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                                        this.data[x].cardata[y].auctiondata=this.data[x].auctiondata;
                                        //this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                                        this.cardata.push(this.data[x].cardata[y]);
                                    }
                                }
                                console.log('cardata logs ...')
                                console.log(this.cardata);
                                console.log('dealer inventorydata');
                                console.log(this.data);
                                console.log('dealer data');
                                console.log(this.cardata);

                                let timeoutId = setInterval(() => {
                                    //alert($('.inventorysinglelistblockcon').length);
                                    if($('.inventorysinglelistblockcon').length>1) {
                                        $('.noresinventory').css('display','none');
                                        //alert(9);
                                    }
                                    else {
                                        //alert(7);
                                        $('.noresinventory').css('display','inline-block');
                                    }
                                    $('.inventorysinglelistblockcon').each(function (index:any) {
                                        if(index>8) $(this).css('display','none');
                                    });
                                    /*$('.inventorysinglelistblockcon').each(function (index:any) {
                                     if(index>8) $(this).css('display','none');
                                     });*/

                                    // alert($('#query_model').val());
                                    //alert($('#query_auction').val());
                                }, 5000);
                                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

                            }, error => {
                                console.log("Oooops!");
                            });


                        // console.log(this.banner_image);
                    }, error => {
                        console.log("Oooops!");
                    });

            }, error => {
                console.log("Oooops!");
            });



        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);
                this.carlogolist=data.json();

                console.log(this.carlogolist);


            }, error => {
                console.log("Oooops!");
                //return '22';
            });

        this.http.get(this.serverUrl+'carautoyearlist')
            .subscribe(data => {
                this.carautoyearlist=data.json();

                // console.log(this.carautoyearlist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'listcarautomileage')
            .subscribe(data => {
                this.carmileagelist=data.json();


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'colorlist')
            .subscribe(data => {
                this.colorlist=data.json();
            }, error => {
                console.log("Oooops!");
            });


        this.http.get(this.serverUrl+'carlist')
            .subscribe(data1 => {
                this.carlistarr = data1.json();
                console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data1 => {
                this.auctionlistarr = data1.json();
                console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });


    }

    getcarlogo(val:any){
        console.log('get car logo ...');
        //console.log(val);
        //carlogolist
        var x:any;
        for(x in this.carlogolist){
            if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
        }
        return 'N/A';
    }
    getcaryear(val:any){
        //console.log(val);
        //carlogolist
        var y:any;
        for(y in this.carautoyearlist){
            if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;
        }
        return 'N/A';
    }
    getmileage(val:any){
        //console.log(val);
        //carlogolist
        var z:any;
        for(z in this.carmileagelist){
            if(this.carmileagelist[z]._id==val.mileage) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }
    getcolor(val:any){
        //console.log(val);
        //carlogolist
        var a:any;
        for(a in this.colorlist){
            if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
        }
        return 'N/A';
    }

 /*   startquerysearch(ev:any){

        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
        $('.inventory_review').val(0);
        $(target).val(tval);
        //alert($(target).val());
        //alert(tval);
        this.query=$(target).val();
        //alert(this.query);
    }*/


}


