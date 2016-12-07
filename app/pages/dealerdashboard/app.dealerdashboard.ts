import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/dealerdashboard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerdashboard {
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
    private userInfo:any;
    details:any;
    username:any;
    filesrc:any;
    sharefilesrc:any;
    carlogolist:any;
    carautoyearlist:any;
    carmileagelist:any;
    colorlist:any;
    carlistarr:any;
    auctionlistarr:any;
    private query_model:any;
    private query_auction:any;
    private query_make:any;
    private query_year:any;
    private query:any;
    private inventorymatcharr:Array<any>;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.query_model=0;
        this.query_auction=0;
        this.query_make=0;
        this.query_year=0;
        this.inventorymatcharr=[];

        this.userInfo=userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log(this.username);
        let ids={dealerusername:this.username};
        this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                console.log(this.details);


            }, error => {
                console.log("Oooops!");
            });
        let link='';
        link = this.serverUrl+'getinventoryfordealer?dealerid='+this.userInfo.id;
        console.log('link ==='+link);
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                console.log('dealer inventorydata');
                console.log(this.data);
                var x:any;
                var y:any;
                var z:any;
                var inventorymatchvalue:any;
                var tempcustomerarrforiventorymatches:Array<any>;
                for (x in this.data){
                    for(y in this.data[x].cardata){

                        this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                        this.data[x].cardata[y].auctiondata=this.data[x].auctiondata;
                        tempcustomerarrforiventorymatches=[];
                        inventorymatchvalue=0;
                        for(z in this.details){
                            if(typeof (this.details[z].base_price!='undefined')){


                                console.log('user detail .. ');
                                console.log(this.details[z].car_auto_year);
                                console.log('car detail data  .. .');
                                console.log(this.data[x].cardata[y].carautoyearlist);
                                console.log('in array log ...');
                                console.log($.inArray( this.data[x].cardata[y].carautoyearlist, this.details[z].car_auto_year ));
                                if($.inArray( this.data[x].cardata[y].carautoyearlist, this.details[z].car_auto_year )>-1){

                                    inventorymatchvalue+=14.3;
                                }

                                this.details[z].inventorymatchval=inventorymatchvalue;
                                if(inventorymatchvalue>0)tempcustomerarrforiventorymatches.push(this.details[z]);
                            }
                        }
                        this.data[x].cardata[y].userdetails=tempcustomerarrforiventorymatches;

                        ///alert(tempcustomerarrforiventorymatches.length);
                        if(tempcustomerarrforiventorymatches.length>0)this.inventorymatcharr.push(this.data[x].cardata[y]);
                        //console.log('customer details');
                        //console.log(this.details);
                    }
                }
                //alert(this.inventorymatcharr.length);
                let timeoutId = setInterval(() => {
                    //alert($('.inventorysinglelistblockcon').length);
                    if($('.inventorysinglelistblockcon').length>0) {
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

                    // alert($('#query_model').val());
                    //alert($('#query_auction').val());
                }, 5000);
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

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

    startquerysearch(ev:any){

        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
        $('.inventory_review').val(0);
        $(target).val(tval);
        //alert($(target).val());
        //alert(tval);
        this.query=$(target).val();
        //alert(this.query);
    }
    getarrcount(item:any,i:any,icar:any){
        //var target = ev.target || ev.srcElement || ev.originalTarget;
        //console.log('ev counter ...');
        //console.log($(target).index());

        $('.inventorysinglelistblockcon').eq(8).nextAll().remove();
        var x=0;
        var totalc=0;
        if(i==0){
            totalc=icar;
            if(totalc>8 )return false;
            else return true;
        }


        console.log('car i counter before loop  '+i);
        while(i+1>x){

            console.log('car counter in loop '+totalc);
            console.log('car  i counter in loop '+i);
            console.log('car  i counter in loop '+i);
            console.log('car x counter in loop '+x);
            console.log('car item data in loop ');
            console.log(item);
            if(i>0){

                totalc=item[0].cardata.length+icar;
                console.log('car counter in loop '+totalc);
            }

            x++;
        }
        console.log('car counter '+totalc);
        alert(totalc);
        if(totalc>8 )return false;
        else return true;
    }
    goinventoryDetails(inventoryid:any){


    }
}


