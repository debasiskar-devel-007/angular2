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


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/package/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppPackage {
    // /@ViewChild(Modal) modal;
    packageform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
   // private userInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    getExpyears:any;
    getCardtype:any;
    expMonths:any;
    filesrc:any;
    userInfo:any;
    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent ,private _sanitizer: DomSanitizer ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.getExpyears = commonservices.getExpyears();
        this.expMonths = commonservices.getMonths();
        this.getCardtype = commonservices.getCardtype();

        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.userInfo=userInfo.getObject('userdetails');
       // console.log(this.userInfo);
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl+'membershippackagelist';
        this.p=1;
        this.orderbyquery='name';
        this.orderbytype=-1;
        this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";;
       this.http.get(link)
            .subscribe(data1 => {

                this.data = data1.json();
                console.log(this.data);
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });

        this.packageform = fb.group({
            username: [this.userInfo.username, Validators.required],
            description: ["", Validators.required],
            name: ["", Validators.required],
            free_member: ["", Validators.required],
            cost_extra_member: ["", Validators.required],
            filename: ["", Validators.required],
            packageid: ["", Validators.required],
            cardtype: ["", Validators.required],
            cardnumber: ["", Validators.required],
            expmonth: ["", Validators.required],
            expyear: ["", Validators.required],
            securitycode: ["", Validators.required],
        });

    }

    formsubmit12(){
      //  console.log(this.packageform.value);
        let x:any;
        for(x in this.packageform.controls){
            this.packageform.controls[x].markAsTouched();

        }
        this.packageform.markAsDirty();
        if(this.packageform.valid){
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
console.log(this.packageform.value);
            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'buymembershippackagebydealer';
            var submitdata = this.packageform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    this.data = data.json()[0];
//console.log(this.data);
//console.log( this.router.navigateByUrl('/orderdetails/'+this.data+'(dealerheader:dealerheader//dealerfooter:dealerfooter)'));

                     this.router.navigateByUrl('/orderdetails/'+this.data+'(dealerheader:dealerheader//dealerfooter:dealerfooter)');

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
    }
    getSortClass(value:any){
        //console.log(value);
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
        //console.log(value);
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

    selectpackage(item:any,event:any){

       console.log(event);
        event.className='pack_subbtn';
        event.target.className='selbtninpt';
        console.log(event.target.className);
        event.preventDefault();
        let items=item;
        this.packageform.patchValue({description: items.description});
        this.packageform.patchValue({name: items.name});
        this.packageform.patchValue({free_member: items.free_member});
        this.packageform.patchValue({cost_extra_member: items.cost_extra_member});
        this.packageform.patchValue({filename: items.filename});
        this.packageform.patchValue({packageid: items._id});
    }


}


