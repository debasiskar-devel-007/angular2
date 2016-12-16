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
import {DomSanitizer} from "@angular/platform-browser";
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/viewcustomers/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppViewcustomers {
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
    p:any;
    pagec:any;
    cardata:Array<any>;
    orderbyquery:any;
    orderbytype:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private _sanitizer: DomSanitizer  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.p=1;
        this.orderbyquery='added_on';
        this.orderbytype=-1;
        this.query_model=0;
        this.query_auction=0;
        this.query_make=0;
        this.query_year=0;
        this.cardata=[];

        this.userInfo=userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
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
        link = this.serverUrl+'getinventoryforcustomerbydealer?dealerusername='+this.username;
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                console.log('dealer inventorydata');
                console.log(this.data);

                var x:any;

                for (x in this.data){
                    this.data[x].sharefilesrc='images/logo_61.png';
                        if(this.data[x].filename) {
                            this.data[x].sharefilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.data[x].filename;
                        }
                        //this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                        this.cardata.push(this.data[x]);
                    }
                    console.log('view customer data');
                console.log(this.cardata);
                this.pagec=Math.ceil(this.data.length / 20);


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


    getmileage(val:any){
        //console.log(val);
        //carlogolist
        var z:any;
        for(z in this.carmileagelist){
            if(this.carmileagelist[z]._id==val.car_mileage) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }
    getcolor(val:any){
        //console.log(val);
        //carlogolist

        var colorstring:any;
        colorstring='';
        var a:any;
        for(a in this.colorlist){
           // if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
            if($.inArray(this.colorlist[a]._id,val.color_opiton)>-1)
                colorstring+=this.colorlist[a].color+' / ';
        }
        if(colorstring!='') return colorstring;
        return 'N/A';
    }
    getcaryear(val:any){
        var rstring:any;
        rstring='';
        var y:any;
        for(y in this.carautoyearlist){
            //if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;

            if($.inArray( this.carautoyearlist[y]._id, val.car_auto_year )>-1)
                rstring+=this.carautoyearlist[y].year+' / ';
        }
        if(rstring!='') return rstring;
        return 'N/A';
    }
    getcarlogo(val:any){
        var makestring:any;
        makestring='';
        var x:any;
        for(x in this.carlogolist){
           // if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
            if($.inArray(this.carlogolist[x]._id,val.upcoming_auction)>-1)
                makestring+=this.carlogolist[x].name+' / '  ;
        }
        if(makestring!='') return makestring;
        return 'N/A';
    }
    startquerysearch(ev:any){

        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
       // $('.inventory_review').val(0);
        $(target).val(tval);
        //alert($(target).val());
        //alert(tval);
        this.query=$(target).val();
        //alert(this.query);
    }

}


