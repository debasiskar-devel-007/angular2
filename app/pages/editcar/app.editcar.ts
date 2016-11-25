import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, OnInit} from '@angular/core';
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


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editcar/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditcar implements OnInit {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};
    myModal :ModalModule;
    addcarform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    getusastates:any;
    uploadedfilesrc:any;
    ckeditorContent:any;
    private userInfo:any;
    auctionlist:any;
    private carlogolist:any;
    private colorlist:any;
    private carbodystylelist:any;
    private carautoyearlist:any;
    private listcarautomileage:any;

    id: number;
    private sub: any;
    details: any;
    //appcomponent:AppComponent;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private route: ActivatedRoute  ) {
        this.ckeditorContent = '';
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userInfo.getObject('userdetails');
console.log(this.userInfo);
        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data => {
                this.auctionlist=data.json();
            }, error => {
                console.log("Oooops!");
            });

        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                this.carlogolist=data.json();
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
        this.http.get(this.serverUrl+'carautoyearlist')
            .subscribe(data => {
                this.carautoyearlist=data.json();
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
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getcarbyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                    console.log(this.details);
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;
                    this.addcarform = fb.group({

                        id: [this.details._id, Validators.required],

                        username: [this.userInfo.username, Validators.required],
                        doctype: [this.details.doctype, Validators.required],
                        est_retail_value: [this.details.est_retail_value, Validators.required],
                        vin: [this.details.doctype, Validators.required],
                        color: [this.details.color, Validators.required],
                        drive: [this.details.drive, Validators.required],
                        cylinder: [this.details.cylinder, Validators.required],
                        fuel: [this.details.fuel, Validators.required],
                        notes: [this.details.notes],
                        is_active: [this.details.is_active],
                        priority: [this.details.priority, Validators.required],
                        filename: [this.details.filename, Validators.required],
                        carlogolist: [this.details.carlogolist, Validators.required],
                        model: [this.details.model, Validators.required],
                        carautoyearlist: [this.details.carautoyearlist, Validators.required],
                        mileage: [this.details.mileage, Validators.required],
                        enginetype: [this.details.enginetype, Validators.required],
                        carbodystylelist: [this.details.carbodystylelist, Validators.required],
                        auctionid: [this.details.auctionid, Validators.required],
                        power_locks: [this.details.power_locks],
                        power_window: [this.details.power_window],
                        sunroof: [this.details.sunroof],
                        digital_display: [this.details.digital_display],
                        stereo_system: [this.details.stereo_system],
                        bluetooth: [this.details.bluetooth],
                        dvd_player: [this.details.dvd_player],
                        gps: [this.details.gps],
                        airbags: [this.details.airbags],
                        seats: [this.details.seats],
                        satellite_radio: [this.details.satellite_radio],
                        lights: [this.details.lights],
                        gear_type: [this.details.gear_type],
                        trinted_window: [this.details.trinted_window],

                    });
                    this.ckeditorContent = this.details.notes;
                    console.log(this.addcarform );

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
        this.addcarform = fb.group({
            username: [this.userInfo.username, Validators.required],
            doctype: ['', Validators.required],
            est_retail_value: ['', Validators.required],
            vin: ['', Validators.required],
            color: ['', Validators.required],
            drive: ['', Validators.required],
            cylinder: ['', Validators.required],
            fuel: ['', Validators.required],
            notes: [''],
            is_active: [''],
            priority: ['', Validators.required],
            filename: ['', Validators.required],
            carlogolist: ['', Validators.required],
            model: ['', Validators.required],
            carautoyearlist: ['', Validators.required],
            mileage: ['', Validators.required],
            enginetype: ['', Validators.required],
            carbodystylelist: ['', Validators.required],
            auctionid: [[], Validators.required],
            power_locks: [""],
            power_window: [""],
            sunroof: [""],
            digital_display: [""],
            stereo_system: [""],
            bluetooth: [""],
            dvd_player: [""],
            gps: [""],
            airbags: [""],
            seats: [""],
            satellite_radio: [""],
            lights: [""],
            gear_type: [""],
            trinted_window: [""],
        });


    }
    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }

    handleUpload(data: any): void
    {

        //console.log(data.progress.percent);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent ;
            if(data.progress.percent==100){
                console.log(data.response);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.addcarform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }

    onChange(event:any){
        //alert(99);
        //(<FormControl>this.addadminform.controls['body']).updateValue(this.ckeditorContent);
        this.addcarform.patchValue({notes: this.ckeditorContent})

    }

    submitform1(){

        let x:any;
        for(x in this.addcarform.controls){
            this.addcarform.controls[x].markAsTouched();

        }
        this.addcarform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.addcarform.valid){
            console.log(11);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecar';
            var submitdata = this.addcarform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                     this.router.navigateByUrl('/carlist(adminheader:adminheader//adminfooter:adminfooter)');

                }, error => {
                    console.log("Oooops!");
                });
        }
    }


 

}


