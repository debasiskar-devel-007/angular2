import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, Renderer, Inject} from '@angular/core';
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
    templateUrl:'app/pages/carlist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCarlist{
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    // /@ViewChild('lgModal') sharemediaModal;

    myModal :ModalModule;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private userInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    sharefilesrc:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    userdetails:any;
    data:any;
    filesrc:any;
    //sharemediaModal:any;
    @ViewChild('all_m')
    private allMElementRef:any;
    private mediaid:any;

    constructor(@Inject(Renderer) private renderer: Renderer,fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private _sanitizer: DomSanitizer  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        //this.userInfo=userInfo;
        this.userdetails=userInfo.getObject('userdetails');
        this.p=1;
        this.orderbyquery='priority';
        this.orderbytype=-1;
        var link=this.serverUrl+'carlist'
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                  console.log(this.data);
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });


    }

    cartrackby(index:any, item:any) {
        console.log(item._id);
        console.log('car id');
        return true;
        //return item._id;
    }

    deleterow(dealerrow:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletecar';
        let id=dealerrow;
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                var index = this.data.indexOf(id.id);
                //let tempdata:Array<any>;
                let x:any;
                for(x in this.data){
                    if(dealerrow._id==this.data[x]._id) {
                        console.log(x+'.......'+this.data.length);
                        delete this.data.x;
                        this.data.splice(x, 1);
                       // window.location.reload();
                    }
                }
                // console.log(this.data);
                //this.data=this.tempdata;
                //this.data.splice(index, 1);
                this.appcomponent.putmessages('Car '+dealerrow.doctype+' deleted successfully','success');
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });


        // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
    }

    changeStatus(item:any){
        var idx = this.data.indexOf(item);
        if(this.data[idx].is_active==1){
            var is_active=0;
        }
        else{
            var is_active=1;
        }
        let stat={id:item._id,is_active:is_active};
        let link= this.serverUrl+'carstatuschange';
        this.http.post(link,stat)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                if(this.data[idx].is_active == 0){
                    this.data[idx].is_active = 1;
                }else{
                    this.data[idx].is_active = 0;
                }
            }, error => {
                console.log("Oooops!");
            });


    }
    getSortClass(value:any){
        //console.log(value);
        if(this.orderbyquery==value && this.orderbytype==-1) {
            console.log('caret-up');
            return 'caret-up'
        }

        if(this.orderbyquery==value && this.orderbytype==1) {
            // console.log('caret-up');
            return 'caret-down'
        }
        return 'caret-up-down'
    }
    manageSorting(value:any){
        // console.log(value);
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

    bannerModal(mediaid:any){
        //let shareid=sharemediaid;
        // $('#sharemediaModal').myModal('show');
        // sharemediaModal.open();
        //  $('#sharemediaModal').modal('show');
        //alert(mediaid);
        this.mediaid=mediaid;
        this.renderer.invokeElementMethod(this.allMElementRef.nativeElement, 'click', []);
        //sharemediaModal.open();
    }



}


