import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
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
    templateUrl:'app/pages/auctionbiddingcustomer/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAuctionbiddingcustomer implements OnInit, OnDestroy {
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
   // private userInfo:CookieService;
    private userInfo:any;
    private messages:any;
    id: number;
    private sub: any;
    details: any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    auctionlist:any;
    private carlogolist:any;
    private carlogolistarr:any;
    private colorlist:any;
    private carbodystylelist:any;
    private carautoyearlist:any;
    private carautoyearlistarr:any;
    private listcarautomileage:any;
    doctype:any;
    est_retail_value:any;
    vin:any;
    color:any;
    drive:any;
    cylinder:any;
    fuel:any;
    notes:any;
    model:any;
    mileage:any;
    enginetype:any;
    power_locks:any;
    power_window:any;
    sunroof:any;
    stereo_system:any;
    bluetooth:any;
    dvd_player:any;
    airbags:any;
    seats:any;
    satellite_radio:any;
    gps:any;
    gear_type:any;
    trinted_window:any;
    uploadedfilesrc1:any;
    uploadedadditionalfilearr:any;
    lights:any;
    carmileagelist:any;
    carbodystylelistarr:any;
    digital_display:any;
    auctionid:any;
     rsvplist:any;
     rsvplistarr:any;
     carlistarr:any;
    filesrc:any;
     auctionname:any;
     auctionimage:any;
     auctiondate:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private route: ActivatedRoute,private _sanitizer: DomSanitizer   ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.userInfo=userInfo.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
        this.uploadedadditionalfilearr=[];
        this.details=[];
        this.rsvplist=[];
        this.rsvplistarr=[];
        this.carlistarr=[];
        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data => {
                this.auctionlist=data.json();
            }, error => {
                console.log("Oooops!");
            });

        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                this.carlogolistarr=data.json();
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
                this.carbodystylelistarr=data.json();
            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carautoyearlist')
            .subscribe(data => {
                this.carautoyearlistarr=data.json();
            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'listcarautomileage')
            .subscribe(data => {
                this.listcarautomileage=data.json();
            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carlist')
            .subscribe(data1 => {
                this.carlistarr = data1.json();
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            // console.log(params['id']);
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getcarbyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                  //  console.log(this.details);
                    this.uploadedfilesrc1 = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;

//console.log(this.uploadedfilesrc1);
                    this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";

                    this.doctype=this.details.doctype;
                    this.est_retail_value=this.details.est_retail_value;
                    this.vin=this.details.vin;
                    this.color=this.details.color;
                    this.drive=this.details.drive;
                    this.cylinder=this.details.cylinder;
                    this.fuel=this.details.fuel;
                    this.notes=this.details.notes;
                    this.carlogolist=this.details.carlogolist;
                    this.model=this.details.model;
                    this.carautoyearlist=this.details.carautoyearlist;
                    this.mileage=this.details.mileage;
                    this.enginetype=this.details.enginetype;
                    this.carbodystylelist=this.details.carbodystylelist;
                    this.power_locks=this.details.power_locks;
                    this.power_window=this.details.power_window;
                    this.power_locks=this.details.power_locks;
                    this.sunroof=this.details.sunroof;
                    this.stereo_system=this.details.stereo_system;
                    this.bluetooth=this.details.bluetooth;
                    this.dvd_player=this.details.dvd_player;
                    this.airbags=this.details.airbags;
                    this.seats=this.details.seats;
                    this.satellite_radio=this.details.satellite_radio;
                    this.gps=this.details.gps;
                    this.lights=this.details.lights;
                    this.gps=this.details.gps;
                    this.gear_type=this.details.gear_type;
                    this.trinted_window=this.details.trinted_window;
                    this.digital_display=this.details.digital_display;
                    console.log('auction id');
                    console.log(this.details);
                    this.auctionid=this.details.auctionid[0];
                    /* this.auctionname=this.details.auctiondata[0].name;
                    this.auctiondate=this.details.auctiondata[0].auction_date;
                    if(typeof(this.details.auctiondata[0].filename)!='undefined')
                        this.auctionimage=this.filesrc+this.details.auctiondata[0].filename;
                    else this.auctionimage='images/logo_61.png';*/



                    console.log('Auction Id');
                    console.log(this.auctionid);

                  //  console.log(this.details.additionalfilename);
                    var x:any;
                    for(x in this.details.additionalfilename){
                     //   console.log(this.details.additionalfilename[x]);
                        this.uploadedadditionalfilearr.push("http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" +this.details.additionalfilename[x]);
                    }
                  //  console.log('Image List');

                   // console.log(this.uploadedadditionalfilearr);

                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

      /*  this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data => {
                this.auctionlist=data.json();
            }, error => {
                console.log("Oooops!");
            });*/



        let linkv1 = this.serverUrl+'getrsvpbycustomerusername';
        let var11={customerusername:this.userInfo.username};
        this.http.post(linkv1,var11)
            .subscribe(data1 => {

                this.rsvplist = data1.json();
               // console.log('rsvp list');
              //  console.log(this.rsvplist);
                var k:any;
                for(k in this.rsvplist){
                  //  console.log(this.rsvplist[k].status);
                    if(this.rsvplist[k].status==1){
                      //  console.log('in status 1 block');
                        this.rsvplistarr.push(this.rsvplist[k]);
                    }
                }
                console.log(this.rsvplistarr);
                // this.rsvplistarr=this.rsvplist;
               // this.pagec=Math.ceil(this.rsvplistarr.length / 9);

            }, error => {
                console.log("Oooops!");
            });




    }
    getcardetails(val:any,val1:any){

        if(this.carlistarr.length==0){
            this.http.get(this.serverUrl+'carlist')
                .subscribe(data1 => {
                    this.carlistarr = data1.json();
                    //console.log(this.data);

                    var x:any;
                    for(x in this.carlistarr){
                        if(val==this.carlistarr[x]._id){

                            if (val1=='make'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcarlogo(this.carlistarr[x].carlogolist);
                            }
                            if (val1=='auctiondate'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.carlistarr[x].auctiondata[0].auction_date;
                            }
                            if (val1=='auctionname'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.carlistarr[x].auctiondata[0].name;
                            }

                            if (val1=='mileage'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getmileage(this.carlistarr[x]);
                            }
                            if (val1=='model'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].model);
                            }
                            if (val1=='enginetype'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].enginetype);
                            }
                            if (val1=='drive'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].drive);
                            }
                            if (val1=='cylinder'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].cylinder);
                            }
                            if (val1=='fuel'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].fuel);
                            }
                            if (val1=='vin'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].vin);
                            }
                            if (val1=='seats'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].seats);
                            }
                            if (val1=='gear_type'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].gear_type);
                            }
                            if (val1=='carbodystyle'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getbodystyle(this.carlistarr[x]);
                            }
                            if (val1=='year'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcaryear(this.carlistarr[x]);
                            }
                            if (val1=='image'){
                                if(typeof (this.carlistarr[x].filename)!='undefined')
                                    return this.filesrc+this.carlistarr[x].filename;
                                else return 'images/logo_61.png';
                            }
                            if (val1=='color'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcolor(this.carlistarr[x]);
                            }
                            if (val1=='price'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].est_retail_value);
                            }
                            return this.carlistarr[x];
                        }

                    }

                }, error => {
                    console.log("Oooops!");
                });
        }
        else{
            var x:any;
            for(x in this.carlistarr){
                if(val==this.carlistarr[x]._id){
                    if (val1=='mileage'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getmileage(this.carlistarr[x]);
                    }
                    if (val1=='model'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].model);
                    }
                    if (val1=='color'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcolor(this.carlistarr[x]);
                    }
                    if (val1=='auctiondate'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.carlistarr[x].auctiondata[0].auction_date;
                    }
                    if (val1=='auctionname'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.carlistarr[x].auctiondata[0].name;
                    }
                    if (val1=='price'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].est_retail_value);
                    }

                    if (val1=='make'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcarlogo(this.carlistarr[x].carlogolist);
                    }
                    if (val1=='auctionname'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].auctiondata[0].name);
                    }
                    if (val1=='year'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcaryear(this.carlistarr[x]);
                    }
                    if (val1=='enginetype'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].enginetype);
                    }
                    if (val1=='drive'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].drive);
                    }
                    if (val1=='cylinder'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].cylinder);
                    }
                    if (val1=='fuel'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].fuel);
                    }
                    if (val1=='vin'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].vin);
                    }
                    if (val1=='seats'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].seats);
                    }
                    if (val1=='gear_type'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].gear_type);
                    }
                    if (val1=='carbodystyle'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getbodystyle(this.carlistarr[x]);
                    }
                    if (val1=='image'){
                        if(typeof (this.carlistarr[x].filename)!='undefined')
                            return this.filesrc+this.carlistarr[x].filename;
                        else return 'images/logo_61.png';
                    }
                    if (val1=='auctionimage'){
                        if(typeof (this.carlistarr[x].auctiondata[0].filename)!='undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].auctiondata[0].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }

                    return this.carlistarr[x];
                }

            }
        }
        return 'N/A'

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

    getcarlogo(val:any){
        var x:any;
       // console.log('car logo val');
       // console.log(val);
        for(x in this.carlogolistarr){
            // console.log('car logo loop val');
            //  console.log(this.carlogolistarr[x]._id);
            if(this.carlogolistarr[x]._id==val) return this.carlogolistarr[x].name;
        }
        return 'N/A';
    }
    getcaryear(val:any){
        var y:any;
        for(y in this.carautoyearlistarr){
            if(this.carautoyearlistarr[y]._id==val) return this.carautoyearlistarr[y].year;
        }
        return 'N/A';
    }
    getauction(val:any,type:any){
        var p:any;
        for(p in this.auctionlist){
            if(this.auctionlist[p]._id==val)
                if(type=='name')
                return this.auctionlist[p].name;
                if(type=='auctiondate')
                  //  return 11;
                return this.auctionlist[p].auction_date;
                if(type=='image')
                return "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/"+this.auctionlist[p].filename;
        }
       // return 'N/A';
    }
    getmileage(val:any){
        var z:any;
        for(z in this.listcarautomileage){
            if(this.listcarautomileage[z]._id==val) return this.listcarautomileage[z].mileage;
        }
        return 'N/A';
    }
    getcolor(val:any){
        var a:any;
        for(a in this.colorlist){
            if(this.colorlist[a]._id==val) return this.colorlist[a].color;
        }
        return 'N/A';
    }
    getbodystyle(val:any){
        var p:any;
        for(p in this.carbodystylelistarr){
            if(this.carbodystylelistarr[p]._id==val) return this.carbodystylelistarr[p].name;
        }
        return 'N/A';
    }
    imageshow(imagesrs:any){
        $('.bigimag').attr('src',imagesrs);
    }
sendsetmax(){
    if($('.bid').val()!='')
    $('#customersetmaxbidModal').modal('show');
}
}


