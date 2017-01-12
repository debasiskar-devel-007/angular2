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
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/recentbidagreement/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppRecentbidagreement{
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
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    private userInfo:any;
    private rsvplist:any;
    private rsvplistarr:any;
    private rsvplistarr1:any;
    private rsvplistarr2:any;
    private filesrc:any;
    private username:any;
    private details:any;
    private carlistarr:any;
    private sharefilesrc:any;
    private carlogolist:any;
    private carautoyearlist:any;
    private carmileagelist:any;
    private colorlist:any;
    private auctionlistarr:any;
    private customprofiledetails:any;
    private customerfile:any;
    private itemrsvpcar:any;
    private carbodystylelist:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent ,private _sanitizer: DomSanitizer ) {
        this.router=router;
        this._sanitizer=_sanitizer;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        console.log(this.messages);
        this.serverUrl = this.items[0].serverUrl;
        let linkt = this.serverUrl+'adminlist';
        this.p=1;
        this.orderbyquery='fname';
        this.orderbytype=-1;
        this.userInfo=userInfo.getObject('userdetails');
        this.details=[];

        this.rsvplistarr=[];
        this.rsvplistarr1=[];
        this.rsvplistarr2=[];
        this.rsvplist=[];
        this.carlistarr=[];
        // alert(link);




        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log(this.username);
        let ids={dealerusername:this.username};
        this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                //console.log(this.details);
                // /this.manageinventory();


            }, error => {
                console.log("Oooops!");
            });


        let linkv1 = this.serverUrl+'getrsvpbydealerid';
        let var11={dealerid:this.userInfo.username};
        this.http.post(linkv1,var11)
            .subscribe(data1 => {

                this.rsvplist = data1.json();
                this.rsvplistarr=this.rsvplist;
                this.pagec=Math.ceil(this.rsvplistarr.length / 9);
                this.rsvplistarr1=this.rsvplist;
                this.rsvplistarr2=this.rsvplist;
                console.log(this.rsvplistarr2);


            }, error => {
                console.log("Oooops!");
            });


        let link='';
        link = this.serverUrl+'getinventoryfordealer?dealerid='+this.userInfo.id;
        console.log('link ==='+link);
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();


                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

            }, error => {
                console.log("Oooops!");
            });

        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);
                this.carlogolist=data.json();

                //console.log(this.carlogolist);


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

        this.http.get(this.serverUrl+'carlist')
            .subscribe(data1 => {
                this.carlistarr = data1.json();
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data1 => {
                this.auctionlistarr = data1.json();
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });

    }


    getcustomerdetails(val:any,val1:any){

        let ids={dealerusername:this.username};
        if(this.details.length==0)
        {
            this.http.post(this.serverUrl+'getcustomerbyusername',ids)
                .subscribe(data => {
                    this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                    this.details=data.json();
                    //console.log(this.details);
                    //this.manageinventory();
                    var x:any;
                    for(x in this.details){
                        if(val==this.details[x].username){

                            if (val1=='name')return this.details[x].fname+' '+this.details[x].lname;
                            if (val1=='image'){
                                if(typeof (this.details[x].filename)!='undefined')
                                    return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.details[x].filename+ " />");
                                else return this._sanitizer.bypassSecurityTrustHtml("<img  src ='images/logo_61.png' />");
                            }
                            return this.details[x];
                        }
                    }
                    return 'N/A';


                }, error => {
                    console.log("Oooops!");
                });
        }
        else
        {
            var x: any;
            for (x in this.details) {
                if (val == this.details[x].username) {
                    if (val1=='name')return this.details[x].fname+' '+this.details[x].lname;
                    if (val1=='username')return this.details[x].username;
                    if (val1=='image'){
                        if(typeof (this.details[x].filename)!='undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.details[x].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }

                    return this.details[x];
                }
            }
            return 'N/A';
        }
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
                                return this.getcarlogo(this.carlistarr[x]);
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
                                    return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].filename+ " />");
                                else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
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
                    if (val1=='price'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].est_retail_value);
                    }

                    if (val1=='make'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcarlogo(this.carlistarr[x]);
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
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
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

    getrsvpapprovalstatus(val:any,val1:any){

        //console.log('val1'+val1+'-- val --'+val);
        if(val==val1) return true;
        return false;

    }

    getmatchpercentageval(val:any,val1:any){

        var customerdata:any=0;
        customerdata=this.getcustomerdetails(val1,'');
        var cardata:any=0;
        cardata=this.getcardetails(val,'');

        //console.log('match data');
        //console.log(customerdata);
        //////console.log(cardata);
        var matchval:any=0;
        if(typeof (customerdata)!='undefined' && typeof (cardata)!='undefined') {

            if ($.inArray(cardata.carautoyearlist ,customerdata.car_auto_year) > -1) matchval += 14.3;
            //if (cardata.carautoyearlist == customerdata.car_auto_year) matchval += 14.3;
            if ($.inArray(cardata.basepricerange , customerdata.base_price)) matchval += 14.3;
            if ($.inArray(cardata.car_body_style , customerdata.car_body_style)) matchval += 14.3;
            if ($.inArray(cardata.color , customerdata.color_opiton)) matchval += 14.3;
            if ($.inArray(cardata.carlogolist , customerdata.upcoming_auction)) matchval += 14.3;
            if (cardata.mileage == customerdata.car_mileage) matchval += 14.3;
        }


        return Math.ceil(matchval)+'%';



    }


    getcarlogo(val:any){
        //console.log('get car logo ...');
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
    getbodystyle(val:any){
        //console.log(val);
        //carlogolist
        var t:any;
        for(t in this.carbodystylelist){
            if(this.carbodystylelist[t]._id==val.carbodystylelist) return this.carbodystylelist[t].name;
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










    deleterow(adminid:any){
        //console.log(adminid);

        let link= this.serverUrl+'deleteadmin';
        let id=adminid;
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                var index = this.data.indexOf(id.id);
                console.log(index);
                //let tempdata:Array<any>;
                let x:any;
                for(x in this.data){
                    console.log(this.data[x]._id);
                    console.log('this.data[x]._id');
                    console.log(adminid._id);
                    if(adminid._id==this.data[x]._id) {
                        console.log(x+'.......'+this.data.length);
                        delete this.data.x;
                        this.data.splice(x, 1);
                        console.log(this.data.length);
                        //this.router.navigate(['adminlist']);
                        window.location.reload();
                    }
                }
                console.log(this.data);
                //this.data=this.tempdata;
                //this.data.splice(index, 1);
                this.appcomponent.putmessages('Admin user '+adminid.username+' deleted successfully','success');
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
        let link= this.serverUrl+'adminstatuschange';
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
        console.log(value);
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
        console.log(value);
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


    viewprofile(itemrsvp:any){
        console.log('Customer Profile ');
        console.log(itemrsvp);
        // var customprofiledetails=[];
        this.customerfile='images/logo_61.png';
        let customerusername = itemrsvp; // (+) converts string 'id' to a number
        let ids={username: itemrsvp.customerusername};
        this.http.post(this.serverUrl+'editdcustomerbyusername',ids)
            .subscribe(data => {
                this.customprofiledetails = data.json()[0];
                if(typeof(this.customprofiledetails.filename)!='undefined'){
                    this.customerfile='http://probidbackend.influxiq.com/uploadedfiles/sharelinks/'+this.customprofiledetails.filename;
                }
                $('#userprofileModal').modal('show');
                console.log('customer details');
                console.log(this.customprofiledetails);
            })


    }

    viewdetails(item:any){
        this.itemrsvpcar=item;
        console.log('Car Info');
        console.log(this.itemrsvpcar);
        console.log(this.itemrsvpcar.inventoryid);
        $('#viewdetailsModal1').modal('show');
    }


}


