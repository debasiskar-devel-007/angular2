import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, OnInit,
    OnDestroy
} from '@angular/core';
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
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editauction/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditauction implements OnInit, OnDestroy {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};
    myModal :ModalModule;
    addauctionform: FormGroup;
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
    id: number;
    private sub: any;
    details: any;
    text:any;


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
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output =  ((''+month).length<2 ? '0' : '') + month + '-'+((''+day).length<2 ? '0' : '') + day +'-' +d.getFullYear() ;


        let timeoutId1 = setTimeout(() => {
            $('#datpicker11').attr('data-date-start-date',output);
        },2000);
        this.addauctionform = fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            is_active: [''],
            priority: ['', Validators.required],
            filename: ['', Validators.required],
            auction_date: ['', Validators.required],

        });

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'editauction',ids)
                .subscribe(data => {
                    console.log(data);
                    this.details=data.json()[0];
                    this.uploadedfilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;
                   // this.ckeditorContent=this.details.description;
                    this.addauctionform = fb.group({
                        name: [this.details.name, Validators.required],
                        _id: [this.details._id, Validators.required],
                        description: [this.details.description, Validators.required],
                        filename: [this.details.filename, Validators.required],
                        priority: [this.details.priority, Validators.required],
                        auction_date: [this.details.auction_date, Validators.required],
                        is_active: [this.details.is_active]
                    });
console.log(this.details.description);
                    this.ckeditorContent = this.details.description;
                }, error => {
                    console.log("Oooops!");
                });


            // In a real app: dispatch action to load the details here.
        });


    }
    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
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
                    this.addauctionform.patchValue({filename: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }

    onChange(event:any){
        //alert(99);
        //(<FormControl>this.addadminform.controls['body']).updateValue(this.ckeditorContent);
        this.addauctionform.patchValue({description: this.ckeditorContent})

    }

    submitform1(){

        let x:any;
        for(x in this.addauctionform.controls){
            this.addauctionform.controls[x].markAsTouched();

        }
        this.addauctionform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.addauctionform.valid){
            console.log(11);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updateauction';
            var submitdata = this.addauctionform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                     this.router.navigateByUrl('/auctionlist(adminheader:adminheader//adminfooter:adminfooter)');

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

    datepick(){


        console.log('datepick called .. ');
        var auctiondat= $('#datpicker11').val();
        if( (auctiondat)!='') {
            this.addauctionform.patchValue({auction_date: auctiondat});
            console.log('undefined not ..');
        }else{
            console.log('dp called');
            let timeoutId = setTimeout(() => {
                this.datepick();
            },3000);
        }

    }


}


