import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation,Renderer, Inject} from '@angular/core';
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
    templateUrl:'app/pages/inventorymatches/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppInventorymatches {
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
    basepricelist:any;
    colorlist:any;
    carlistarr:any;
    auctionlistarr:any;
    carbodystylelist:any;
    private query_model:any;
    private query_auction:any;
    private query_make:any;
    private query_year:any;
    private query:any;
    private inventorymatcharr:Array<any>;
    private orderbyqueryinventorymatch:any;
    private orderbytypeinventorymatch:any;
    private userinformation:any;
    p:any;
    pagec:any;
    private inventory:any;
    @ViewChild('all_m')

    private allMElementRef:any;
    private datatemp:any;
    private detailstemp:any;

    constructor(@Inject(Renderer) private renderer: Renderer,fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private _sanitizer: DomSanitizer  ) {
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
        this.p=1;
        this.orderbyqueryinventorymatch='inventorymatchval';
        this.orderbytypeinventorymatch=-1;
        this.userInfo=userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log(this.username);
        let ids={dealerusername:this.username};
        this.details=[];
        this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                this.detailstemp=JSON.stringify(data.json());
                console.log(this.details);


            }, error => {
                console.log("Oooops!");
            });
        let link='';
        link = this.serverUrl+'getinventoryfordealer?dealerid='+this.userInfo.id;
       // console.log('link ==='+link);
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                this.datatemp = JSON.stringify( data1.json());
               // console.log('dealer inventorydata');
               // console.log(this.data);
                var x:any;
                var y:any;
                var z:any;
                var inventorymatchvalue:any;
                var inventorymatchvaluearr:Array<any>;
                var inventorymatchvalueclass:Array<any>;
                var tempcustomerarrforiventorymatches:Array<any>;
                for (x in this.data){
                    for(y in this.data[x].cardata){

                        this.data[x].cardata[y].auctionids=this.data[x].cardata[y].auctionid.join("-");
                        this.data[x].cardata[y].auctiondata=this.data[x].auctiondata;
                        tempcustomerarrforiventorymatches=[];

                        for(z in this.details){
                            inventorymatchvalue=0;
                            inventorymatchvaluearr=[];
                            inventorymatchvalueclass=[];
                            if(typeof (this.details[z].base_price!='undefined')){
                                //alert(39);

                               //  console.log('user detail .. ');
                                // console.log(this.details[z]);
                                // console.log('car detail data  .. .');
                                // console.log(this.data[x].cardata[y]);
                                // console.log('in array log ...');
                              //  console.log($.inArray( this.data[x].cardata[y].carbodystylelist, this.details[z].car_body_style ));
                                if($.inArray( this.data[x].cardata[y].carautoyearlist, this.details[z].car_auto_year )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Year /');
                                    inventorymatchvalueclass['yr']='match';
                                }
                                else{
                                    inventorymatchvalueclass['yr']='unmatched';
                                }
                                if($.inArray( this.data[x].cardata[y].basepricerange, this.details[z].base_price )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Price /');
                                    inventorymatchvalueclass['bp']='match';
                                }
                                else{
                                    inventorymatchvalueclass['bp']='unmatched';
                                }
                                if($.inArray( this.data[x].cardata[y].car_body_style, this.details[z].car_body_style )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Body Style / ');
                                    inventorymatchvalueclass['bs']='matched';
                                }
                                else{
                                    inventorymatchvalueclass['bs']='unmatched';
                                }
                                if($.inArray( this.data[x].cardata[y].color, this.details[z].color_opiton )>-1){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Color /');
                                    inventorymatchvalueclass['cl']='match';
                                }
                                else{
                                    inventorymatchvalueclass['cl']='unmatched';
                                }
                                if($.inArray( this.data[x].cardata[y].carlogolist, this.details[z].upcoming_auction )>-1){

                                    //alert(9);
                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Make /');
                                    inventorymatchvalueclass['mk']='match';
                                }
                                else
                                {
                                    inventorymatchvalueclass['mk']='unmatched';
                                }
                                if (this.data[x].cardata[y].mileage ==this.details[z].car_mileage){

                                    inventorymatchvalue+=14.3;
                                    inventorymatchvaluearr.push('Mileage /');
                                    inventorymatchvalueclass['ml']='match';

                                }
                                else{
                                    inventorymatchvalueclass['ml']='unmatched';
                                }
                                console.log('push arr...');
                                console.log(this.details[z]);
                                console.log('class arr...');
                                console.log(inventorymatchvalueclass);

                                this.details[z].inventorymatchval=Math.ceil(inventorymatchvalue);
                                this.details[z].inventorymatchvaluearr=inventorymatchvaluearr;
                                this.details[z].inventorymatchvalueclass=inventorymatchvalueclass;
                                if(inventorymatchvalue>0)tempcustomerarrforiventorymatches.push(this.details[z]);
                                console.log('inventorymatchvalue == '+inventorymatchvalue);
                            }
                        }
                        this.data[x].cardata[y].userdetails=tempcustomerarrforiventorymatches;


                        ///alert(tempcustomerarrforiventorymatches.length);
                        if(tempcustomerarrforiventorymatches.length>0){
                            this.inventorymatcharr.push(this.data[x].cardata[y]);
                            console.log('inventory user array length d');
                            console.log(this.data[x].cardata[y].userdetails.length);
                        }

                    }
                }
               // console.log('inventory datas');
               // console.log(this.inventorymatcharr);
                this.pagec=Math.ceil(this.inventorymatcharr.length / 9);
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
        this.http.get(this.serverUrl+'carbodystylelist')
            .subscribe(data => {
                this.carbodystylelist=data.json();
            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'basepricelist')
            .subscribe(data => {
                this.basepricelist=data.json();
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
    getcarlogos(val:any){
        var x1:any;
        for(x1 in this.carlogolist){
            if(this.carlogolist[x1]._id==val.carlogolist) return this.carlogolist[x1].logo;
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
    getmileageforuser(val:any){
        //console.log(val);
        //carlogolist
        var z1:any;
        for(z1 in this.carmileagelist){
            if(this.carmileagelist[z1]._id==val.car_mileage) return this.carmileagelist[z1].mileage;
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
    getbodystyle(val:any){
        //console.log(val);
        //carlogolist
        var t:any;
        for(t in this.carbodystylelist){
            if(this.carbodystylelist[t]._id==val.carbodystylelist) return this.carbodystylelist[t].name;
        }
        return 'N/A';
    }
    getbaseprice(val:any){
        //console.log(val);
        //carlogolist
        var t1:any;
        for(t1 in this.basepricelist){
            if(this.basepricelist[t1]._id==val.basepricerange
            ) return this.basepricelist[t1].baseprice;
        }
        return 'N/A';
    }




    getcolorforuserinfo(val:any){
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
    getcaryearforuser(val:any){
        var rstring:any;
        rstring='';
        var y:any;
        for(y in this.carautoyearlist){
            //if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;

            if($.inArray( this.carautoyearlist[y]._id, val.car_auto_year
                )>-1)
                rstring+=this.carautoyearlist[y].year+' / ';
        }
        if(rstring!='') return rstring;
        return 'N/A';
    }
    getcarlogoforuser(val:any){
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
    getcarbodystyleforuser(val:any){
        var makestring2:any;
        makestring2='';
        var x2:any;
        for(x2 in this.carbodystylelist){
            // if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
            if($.inArray(this.carbodystylelist[x2]._id,val.car_body_style)>-1)
                makestring2+=this.carbodystylelist[x2].name+' / '  ;
        }
        if(makestring2!='') return makestring2;
        return 'N/A';
    }

    getbasepricelistforuser(val:any){
        var makestring21:any;
        makestring21='';
        var x3:any;
        for(x3 in this.basepricelist){
            // if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
            if($.inArray(this.basepricelist[x3]._id,val.base_price)>-1)
                makestring21+=this.basepricelist[x3].baseprice+' / '  ;
        }
        if(makestring21!='') return makestring21;
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
    getmatchpercentage(val:any){
        return this._sanitizer.bypassSecurityTrustHtml(val);
    }
    inventoryModalopen(inventory:Array<any>,userarr:Array<any>){
         this.inventory=inventory;
         this.userinformation=userarr;

        this.userinformation.userimage='images/logo_61.png';
        if(this.userinformation.filename) {
            this.userinformation.userimage = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.userinformation.filename;
        }

        console.log('Modal Info')
        console.log(this.inventory);
        console.log('User Info');
        console.log(this.userinformation);
        this.renderer.invokeElementMethod(this.allMElementRef.nativeElement, 'click', []);
    }

    rsvpModalopen(inventory:Array<any>,userarr:Array<any>){
        this.inventory=inventory;
        this.userinformation=userarr;
        this.userinformation.userimage='images/logo_61.png';
        if(this.userinformation.filename) {
            this.userinformation.userimage = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.userinformation.filename;
        }

        $("#rsvpModal").modal('show');
    }
}


