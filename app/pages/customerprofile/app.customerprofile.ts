import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
import {Routes, RouterModule, ActivatedRoute,Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {AppComponent} from "../home/app.component";
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/customerprofile/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerprofile  implements OnInit, OnDestroy {
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
    id: number;
    private sub: any;
    details: any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    sharefilesrc:any;
    sharefilesrc1:any;
    filesrc:any;
    username:any;
    customerlist:any;
    carlogolist:any;
    carautoyearlist:any;
    carmileagelist:any;
    colorlist:any;
    carlistarr:any;
    auctionlistarr:any;
    carimg:any;
    auctionimg:any;
    customerlistarr:Array<any>;
    private query_model:any;
    private query_auction:any;
    private query_make:any;
    private query_year:any;
    private query:any;
    private inventorymatcharr:Array<any>;
    private orderbyqueryinventorymatch:any;
    private orderbytypeinventorymatch:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private route: ActivatedRoute ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userInfo.getObject('userdetails');
        this.p=1;
        this.query_model=0;
        this.query_auction=0;
        this.query_make=0;
        this.query_year=0;
        this.inventorymatcharr=[];
        //this.orderbyquery='bannername';
        this.orderbytype=-1;
        this.customerlistarr=[];
        this.serverUrl = this.items[0].serverUrl;

        this.userInfo=userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log(this.username);
        let ids1={dealerusername:this.username};
        this.http.post(this.serverUrl+'getcustomerbyusername',ids1)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                console.log(this.details);


            }, error => {
                console.log("Oooops!");
            });

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getcustomerinfobyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                    this.sharefilesrc1='images/logo_61.png';
                    if(this.details.filename){
                        this.sharefilesrc1="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;
                    }
                    console.log('particular customer data ..');
                    console.log(this.details);

                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
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
                var inventorymatchvaluearr:Array<any>;
                var tempcustomerarrforiventorymatches:Array<any>;
                console.log('user info ...');
                console.log(this.id);
                let timeoutId1 = setInterval(() => {
                for (x in this.data){
                    for(y in this.data[x].cardata){

                        this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                        this.data[x].cardata[y].auctiondata=this.data[x].auctiondata;
                        tempcustomerarrforiventorymatches=[];

                        //for(z in this.details){
                            inventorymatchvalue=0;
                            inventorymatchvaluearr=[];
                            console.log('log data ... ');
                            console.log(this.details._id);
                            if(this.details._id==this.id){
                                //alert(39);

                                /* console.log('user detail .. ');
                                 console.log(this.details[z]);
                                 console.log('car detail data  .. .');
                                 console.log(this.data[x].cardata[y]);
                                 console.log('in array log ...');*/
                                console.log($.inArray( this.data[x].cardata[y].carbodystylelist, this.details.car_body_style ));
                                if($.inArray( this.data[x].cardata[y].carautoyearlist, this.details.car_auto_year )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Year /');
                                }
                                if($.inArray( this.data[x].cardata[y].basepricerange, this.details.base_price )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Price /');
                                }
                                if($.inArray( this.data[x].cardata[y].car_body_style, this.details.car_body_style )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Body Style / ');
                                }
                                if($.inArray( this.data[x].cardata[y].color, this.details.color_opiton )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Color /');
                                }
                                if($.inArray( this.data[x].cardata[y].carlogolist, this.details.upcoming_auction )>-1){

                                    //alert(9);
                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Make /');
                                }
                                if (this.data[x].cardata[y].mileage ==this.details.car_mileage){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Mileage /');

                                }

                                this.details.inventorymatchval=Math.ceil(inventorymatchvalue);
                                this.details.inventorymatchvaluearr=inventorymatchvaluearr;
                                if(inventorymatchvalue>0)tempcustomerarrforiventorymatches.push(this.details);
                                console.log('inventorymatchvalue == '+inventorymatchvalue);
                            }
                        //}
                        this.data[x].cardata[y].userdetails=tempcustomerarrforiventorymatches;

                        ///alert(tempcustomerarrforiventorymatches.length);
                        if(tempcustomerarrforiventorymatches.length>0)this.inventorymatcharr.push(this.data[x].cardata[y]);
                        //console.log('customer details');
                        //console.log(this.details);
                    }
                }

            }, 5000);
                console.log('inventory datas');
                console.log(this.inventorymatcharr);
                alert(this.inventorymatcharr.length);
                this.carimg="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" ;

                let m:any;
                for(m in this.inventorymatcharr){
                        this.inventorymatcharr.splice(m, 6);

                }
                console.log('profile inventory');
                console.log(this.inventorymatcharr);
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
                    // alert($('#query_model').val());
                    //alert($('#query_auction').val());
                }, 5000);
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

            }, error => {
                console.log("Oooops!");
            });




        let ids={dealerusername:this.username};
        console.log('logging ...');
        console.log(this.username);
        this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
               // this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.customerlist=data.json();
                console.log(this.customerlist);
                console.log('customer list length');
                console.log(this.customerlist.length);
                var x:any;
                for(x in this.customerlist){
               // if(this.customerlist[x]._id!=this.id){
                    this.customerlist[x].filesrc='images/logo_61.png';
                    if(this.customerlist[x].filename){
                        this.customerlist[x].filesrc= "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.customerlist[x].filename;
                    }
                    this.customerlistarr.push(this.customerlist[x]);
               // }
                }
                console.log('customerlist');
                console.log(this.customerlistarr);

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


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });

    }

ngOnDestroy() {
    this.sub.unsubscribe();
}

}


