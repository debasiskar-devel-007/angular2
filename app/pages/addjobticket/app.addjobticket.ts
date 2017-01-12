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
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/addjobticket/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddjobticket {
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
    ckeditorContent:any;
    private username:any;
    private filesrc:any;
    private details:any;
    private customerarr:any;
    fruitName: any;
    private fruits:any;
    private selectedFruit:any;
    private messgaetoerror: any;
    private messgaebodyerror: any;
    private messgaesubjecterror: any;
    private messgaetousername: any;
    private customerlist: any;
    private dealerlist: any;
    private messageaar: Array<any>;
    private sentmessageaar: Array<any>;
    private breaklog1:any;
    private breaklog:any;
    private datab:any;
    private messageaarpub:any;
    private sendmessageaarpub:any;
    private user:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router = router;

        this.messgaetoerror = false;
        this.messgaebodyerror = false;
        this.messgaesubjecterror = false;
        this.http = http;
        this.router = router;
        this.appcomponent = appcomponent;
        this.commonservices = commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        let link = this.serverUrl + 'bannerlist';
        this.p = 1;
        this.orderbyquery = 'bannername';
        this.orderbytype = -1;
        this.messageaar=[];
        this.sentmessageaar=[];
        this.messageaarpub=[];
        this.sendmessageaarpub=[];
        this.breaklog=0;
        this.breaklog1=0;
        this.dealerlist=[];
        this.customerlist=[];
        this.ckeditorContent = '';
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.pagec = Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });

        this.fruits = [
            {
                id: 1,
                name: "Apple",
                searchText: "apple"
            },
            {
                id: 2,
                name: "Orange",
                searchText: "orange"
            },
            {
                id: 3,
                name: "Banana",
                searchText: "banana"
            }
        ];


        this.userInfo = userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log('user role');
        console.log(this.userInfo.userrole);
        if (this.userInfo.userrole == 'admin') {

           // let ids = {username: this.userInfo.dealerusername};
            let ids ={};
            this.http.get(this.serverUrl + 'dealerlist')
                .subscribe(data => {
                    this.filesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                    this.details = data.json();
                    console.log('dealer detail as customer ..');
                    console.log(this.details);
                    console.log(this.details.length);
                    var x: any;
                    for (x in this.details) {
                        this.details[x].name = this.details[x].fname + " " + this.details[x].lname + ' ( ' + this.details[x].username + ' ) ';

                        $('.typeahead').val(this.details[x].name);
                        $('.typeahead').attr('disabled','disabled');

                    }
                    /*$('.typeahead').typeahead({
                     hint: true,
                     highlight: true,
                     minLength: 1
                     },
                     {
                     name: 'states',
                     source: (this.customerarr)
                     });*/
                    var options = {
                        data: this.details,
                        getValue: "name",
                        list: {
                            match: {
                                enabled: true
                            }
                        }
                    };
                    $(".typeahead").easyAutocomplete(options);
                    console.log('dealer details');
                    console.log(this.userInfo);
                    console.log(this.userInfo.userfullname + ' ( ' + this.username + ' ) ');
                    //alert(88);


                }, error => {
                    console.log("Oooops!");
                });
        }
        if(this.userInfo.userrole=='dealer'){
            this.user='admin';
            $('.typeahead').attr('disabled','disabled')
    }
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


    fruitSelected(fruit:any) {
        this.fruitName = fruit ? fruit.name : 'none';
    }

    sendemail() {
        console.log(88888);
        this.messgaetoerror=false;
        this.messgaesubjecterror=false;
        this.messgaebodyerror=false;

        var messagetostring: any;
        messagetostring = $('.typeahead').val();
        if (this.userInfo.userrole == 'admin') {
            if (messagetostring == '') {
                this.messgaetoerror = true;
                $('.messgaetoerror').text('Select a Customer you want to message !');
                return;
            }
        }

        var messagesubject: any;
        messagesubject = $('.messagesubject').val();
        if (messagesubject == '') {
            this.messgaesubjecterror = true;
            //$('.messgaetoerror').text('Select a Customer you want to message !');
            return;
        }
        //alert(this.checkmessagetoerror(messagetostring));
        if (this.userInfo.userrole == 'admin') {
            if (this.checkmessagetoerror(messagetostring)) {
                //alert(9);
                $('.messgaetoerror').text('Select a Customer from the options only and you can message only one person at a time  !');
                return;
            }
        }

        if(this.ckeditorContent=='') {
            this.messgaebodyerror=true;
            return;
        }
        if(this.userInfo.userrole=='admin'){
            var username=this.messgaetousername;
        }
        if(this.userInfo.userrole=='dealer'){
            var username=this.user;
        }

        let link = this.serverUrl+'addjobticket';
        var submitdata = {'to':username,'subject':messagesubject,'body':this.ckeditorContent,'parentid':0,'from':this.username};
       // console.log('submitdata');
        //alert('submitdata');
       // console.log(submitdata);
        this.http.post(link,submitdata)
            .subscribe(data => {
                // /this.data1.response = data.json();
                console.log('Add Job ticket submitted');
                //alert('Add Job ticket submitted');
                this.router.navigateByUrl('/jobticketinbox(dealerheader:dealerheader//dealerfooter:dealerfooter)');

            }, error => {
                //this.router.navigateByUrl('/jobticketinbox(dealerheader:dealerheader//dealerfooter:dealerfooter)');
                console.log("Oooops!");
            });
        //this.router.navigateByUrl('/jobticketinbox(dealerheader:dealerheader//dealerfooter:dealerfooter)');


    }

        checkmessagetoerror(val:any){
            //alert(val);
            var x: any;
            for (x in this.details) {
                if (this.details[x].name == val) {
                    this.messgaetoerror = false;
                    this.messgaetousername=this.details[x].username;
                    return;
                }
            }
            this.messgaetoerror=true;
            //alert(5);
            $('.messgaetoerror').html('Select a Customer from the options only and you can message only one person at a time  !');
            return;


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
       // if(this.dealerlist.length>0 && this.customerlist.length>0) {
            this.messageaar = [];
            this.messageaarpub=[];
            console.log('userinfo  in makemessagelist.. .. ');
            console.log(this.userInfo.username);
            console.log(this.data.length);
            var x: any;
            for (x in this.data) {
                if(this.data[x].parentid!=0) this.data[x]._id=this.data[x].parentid;
                if (this.data[x].to == this.userInfo.username) {
                    this.data[x].fromfullname = this.getuserinfo(this.data[x].from);
                    this.messageaar[this.data[x]._id]=(this.data[x]);
                }
            }

            for ( var key in this.messageaar ){
                this.messageaarpub.push(this.messageaar[key]);
            }


            console.log('message final array');
            console.log(this.messageaar);
            console.log(this.messageaar.length);
            this.sendmessagelist();
       // }
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


