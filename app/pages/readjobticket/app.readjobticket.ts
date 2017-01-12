import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnDestroy, OnInit} from '@angular/core';
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
    templateUrl:'app/pages/readjobticket/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppReadjobticket implements OnInit, OnDestroy{
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: any;
    private userInfo:any;
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    sharefilesrc:any;
    private customerlist: any;
    private dealerlist: any;
    private messageaar: Array<any>;
    private sentmessageaar: Array<any>;
    private breaklog1:any;
    private breaklog:any;
    private datab:any;
    private sub:any;
    private route:any;
    private currentmessage:any;
    ckeditorContent:any;
    private replyopen:any;
    private messgaebodyerror:any;
    private replymessages:any;
    private messageaarpub:any;
    private sendmessageaarpub:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent ,route: ActivatedRoute  ) {
        this.router=router;
        this.replyopen=false;
        this.http=http;
        this.route=route;
        this.replymessages=[];
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.userInfo=userInfo.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl+'bannerlist';
        this.p=1;
        this.orderbyquery='bannername';
        this.orderbytype=-1;
        this.messageaar=[];
        this.sentmessageaar=[];
        this.messageaarpub=[];
        this.sendmessageaarpub=[];
        this.ckeditorContent='';
        this.http.get(link)
            .subscribe(data1 => {
                this.datab = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.pagec=Math.ceil(this.datab.length / 10);

            }, error => {
                console.log("Oooops!");
            });

        this.messageaar=[];
        this.messgaebodyerror=false;
        this.breaklog=0;
        this.breaklog1=0;
        this.dealerlist=[];
        this.customerlist=[];
        this.currentmessage=[];
        //this.sub = this.route.params.subscribe(params => {
            this.id = this.route.snapshot.params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
       // });

        link = this.serverUrl+'jobticketlist';
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                console.log(' message list ...');
                console.log(this.data);
                console.log(this.data.length);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        link = this.serverUrl+'customerlist';
        console.log(link);
        this.http.get(link)
            .subscribe(data1 => {
                this.customerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                console.log(' customer list ...');
                console.log(this.customerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        link = this.serverUrl+'dealerlist';
        console.log(link);
        this.http.get(link)
            .subscribe(data1 => {
                this.dealerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                console.log(' dealer list ...');
                console.log(this.dealerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

    }

    ngOnInit() {


    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

    openreply(){
        this.replyopen=true;

    }
    sendreply(){

        if(this.ckeditorContent=='') {
            this.messgaebodyerror=true;
            return;
        }

        let link = this.serverUrl+'addjobticket';
        var submitdata = {'to':this.currentmessage[0].from,'subject':this.currentmessage[0].subject,'body':this.ckeditorContent,'parentid':this.id,'from':this.userInfo.username};
        this.http.post(link,submitdata)
            .subscribe(data => {
                // /this.data1.response = data.json();
                this.router.navigateByUrl('/jobticketinbox(dealerheader:dealerheader//dealerfooter:dealerfooter)')

            }, error => {
                console.log("Oooops!");
            });

    }

    deleterow(dealerrow:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletebanner';
        let id=dealerrow;
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                var index = this.data.indexOf(id.id);
                console.log(index);
                //let tempdata:Array<any>;
                let x:any;
                for(x in this.data){
                    if(dealerrow._id==this.data[x]._id) {
                        delete this.data.x;
                        this.data.splice(x, 1);
                        window.location.reload();
                    }
                }
                 this.appcomponent.putmessages('Banner '+dealerrow.bannername+' deleted successfully','success');
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
        let link= this.serverUrl+'bannerstatuschange';
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
        if(this.orderbyquery==value && this.orderbytype==-1) {
            return 'caret-up'
        }

        if(this.orderbyquery==value && this.orderbytype==1) {
            return 'caret-down'
        }
        return 'caret-up-down'
    }
    manageSorting(value:any){
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


    private makemessagelist() {
        //if(this.dealerlist.length>0 && this.customerlist.length>0) {
            this.messageaar = [];
            this.messageaarpub=[];
            this.replymessages = [];
            console.log('userinfo  in makemessagelist.. .. ');
            console.log(this.userInfo.username);
            console.log(this.data.length);
            var x: any;
            for (x in this.data) {
                if(this.id==this.data[x]._id){
                    console.log('got the current message');
                    this.data[x].fromfullname = this.getuserinfo(this.data[x].from);
                    this.currentmessage.push(this.data[x]);
                }
                if(this.id==this.data[x].parentid){
                    this.data[x].fromfullname = this.getuserinfo(this.data[x].from);
                    this.replymessages.push(this.data[x]);
                }
                if(this.data[x].parentid!=0) this.data[x]._id=this.data[x].parentid;
                if (this.data[x].to == this.userInfo.username) {
                    this.data[x].fromfullname = this.getuserinfo(this.data[x].from);
                    this.messageaar[this.data[x]._id]=(this.data[x]);
                }

                console.log(this.id+'==='+this.data[x]._id);
                console.log(this.replymessages+'reply count');
                console.log(this.replymessages.length+'reply count');
            }

        for ( var key in this.messageaar ){
            this.messageaarpub.push(this.messageaar[key]);
        }

        this.sendmessagelist();
        //}
    }
    private sendmessagelist() {
        // if(this.dealerlist.length>0 && this.customerlist.length>0) {
        this.sentmessageaar = [];
        this.sendmessageaarpub=[];
        console.log('userinfo  in makemessagelist.. .. ');
        console.log(this.userInfo.username);
        console.log(this.data.length);
        var x: any;
        for (x in this.data) {
            if(this.data[x].parentid!=0) this.data[x]._id=this.data[x].parentid;
            if (this.data[x].from == this.userInfo.username) {
                this.data[x].fromfullname = this.getuserinfo(this.data[x].from);
                this.sentmessageaar[this.data[x]._id]=(this.data[x]);
            }
        }

        for ( var key in this.sentmessageaar ){
            this.sendmessageaarpub.push(this.sentmessageaar[key]);
        }


        console.log('message final array');
        console.log(this.messageaar);
        console.log(this.messageaar.length);
        // }
    }
    private getuserinfo(from:any) {
        var y:any;
        for(y in this.customerlist){
            this.breaklog++;

            if(from==this.customerlist[y].username){
                return this.customerlist[y].fname+' '+this.customerlist[y].lname+' ( '+this.customerlist[y].username+' ) ';
            }

        }
        var z:any;
        for(z in this.dealerlist){
            this.breaklog1++;

            if(from==this.dealerlist[z].username){
                return this.dealerlist[z].fname+' '+this.dealerlist[z].lname+' ( '+this.dealerlist[z].username+' ) ';
            }

        }

        return '';

    }



}


