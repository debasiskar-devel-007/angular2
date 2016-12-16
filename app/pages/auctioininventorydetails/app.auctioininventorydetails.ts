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


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/auctioininventorydetails/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAuctioininventorydetails implements OnInit, OnDestroy {
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
    private userInfo:CookieService;
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
    lights:any;
    carmileagelist:any;
    carbodystylelistarr:any;
    digital_display:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private route: ActivatedRoute,private _sanitizer: DomSanitizer   ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
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
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
           // console.log(params['id']);
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getcarbyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                    console.log(this.details);
                    this.uploadedfilesrc1 = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;

console.log(this.uploadedfilesrc1);


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



                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data => {
                this.auctionlist=data.json();
            }, error => {
                console.log("Oooops!");
            });





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
        console.log('car logo val');
        console.log(val);
        for(x in this.carlogolistarr){
            console.log('car logo loop val');
            console.log(this.carlogolistarr[x]._id);
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


}


