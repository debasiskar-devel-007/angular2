import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit, ElementRef, NgZone,
    OnDestroy
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';

import {AppComponent} from "../home/app.component";
//import {SimplePageScroll} from 'ng2-simple-page-scroll';

declare var $: any;



@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/editopencontract/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditopencontract implements OnInit, OnDestroy {
    // /@ViewChild(Modal) modal;

    addbannersizeform: FormGroup;
    myModal :ModalModule;
    http:Http;
    items:any;

    serverUrl:any;
    commonservices:AppCommonservices;
    private userdetails:CookieService;
    private router: Router;
    uploadedfilesrc:any;
    userDetails:any;
    data2:any;

    appcomponent:AppComponent;
    tempdata:Array<any>;
    customerinfo:any;
    getusastates:any;
    coockieData:CookieService;
    purchasetimilist:any;
    basepricelist:any;
    carlogolist:any;
    carlogosrc:any;
    package_image:any;
    carbodystylelist:any;
    carbodystylelogosrc:any;
    carautoyearlist:any;
    carmileagelist:any;
    carfeaturelist:any;
    carfeaturesrc:any;
    private colorlist:any;
    private details1:any;
    private rows:any;
    private colorval:Array<any>;
    private static colorval:Array<any>;
    private upcoming_auctionarr:Array<any>;
    private autoyeararr:Array<any>;
    private updatebodystylearr:Array<any>;
    private updatepricearr:Array<any>;
    private updatecarfeaturearr:Array<any>;
    private elementRef: ElementRef;
    private customersignupupdateform:any;
    private addbannersizeformnew:any;
    private contractlist:any;
    private currentcontract:any;
    id: number;
    private sub: any;
    details: any;
    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userdetails:CookieService ,router: Router,elementRef: ElementRef,appcomponent:AppComponent,private route: ActivatedRoute) {

        this.items = commonservices.getItems();
        this.http=http;
        this.currentcontract=[];
        this.elementRef=elementRef;
        this.colorval=[];
        this.autoyeararr=[];
        this.upcoming_auctionarr=[];
        this.updatebodystylearr=[];
        this.updatepricearr=[];
        this.updatecarfeaturearr=[];

        this.router=router;
        this.userDetails=userdetails.getObject('userdetails');
        this.addbannersizeform = fb.group({
            commissiontype: ["", Validators.required],
            commission: ['', Validators.required],
            dealerid: [this.userDetails.id, Validators.required],
            //id: [""],
            // width: ["", Validators.required]
        });



        this.serverUrl = this.items[0].serverUrl;

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            let ids={id:this.id};
            this.http.post(this.serverUrl+'getopencontractbyid',ids)
                .subscribe(data => {
                    this.details=data.json()[0];
                    console.log('contract details .. ');
                    console.log(this.details);
                    let timeoutId = setTimeout(() => {
                        $('.bprice').removeAttr('checked');

                        var bp:any;
                        for(bp in this.details.base_price){
                            $('#'+this.details.base_price[bp]).click();

                        }

                        $('.color').removeAttr('checked');
                        var cr:any;
                        for(cr in this.details.color_opiton){
                          $('#'+this.details.color_opiton[cr]).click();
                        }
                        $('.upcoming').removeAttr('checked');
                        var upcng:any;
                        for(upcng in this.details.upcoming_auction){
                            $('#'+this.details.upcoming_auction[upcng]).click();
                        }
                        $('.bodystyle').removeAttr('checked');
                        var bodyst:any;
                        for(bodyst in this.details.car_body_style){
                            $('#'+this.details.car_body_style[bodyst]).click();
                        }
                        $('.year').removeAttr('checked');
                        var yr:any;
                        for(yr in this.details.car_auto_year){
                            $('#'+this.details.car_auto_year[yr]).click();
                        }
                        $('.feature').removeAttr('checked');
                        var featr:any;
                        for(featr in this.details.car_feature){
                            $('#'+this.details.car_feature[featr]).click();
                        }


                    }, 2000);


                    this.addbannersizeformnew = fb.group({
                        id: [this.details._id, Validators.required],
                        commissiontypen: [this.details.commissiontypen, Validators.required],
                        option_name: [this.details.option_name, Validators.required],
                        priority: [this.details.priority, Validators.required],
                        commissionn: [this.details.commissionn, Validators.required],
                        dealeridn: [this.userDetails.id, Validators.required],
                        base_price: [this.details.base_price],
                        color_opiton: [this.details.color_opiton],
                        car_feature: [this.details.car_feature],
                        upcoming_auction: [this.details.upcoming_auction],
                        car_body_style: [this.details.car_body_style],
                        car_auto_year: [this.details.car_auto_year],
                        car_mileage: [this.details.car_mileage],
                    });



                }, error => {
                    console.log("Oooops!");
                });

            // In a real app: dispatch action to load the details here.
        });

        let link = this.serverUrl+'getretailcommissionlist';

        let var1={dealerid:this.userDetails.id};
        this.http.post(link,var1)
            .subscribe(data1 => {

                this.data2 = data1.json();

                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.addbannersizeform = fb.group({
                    commissiontype: [this.data2[0].commissiontype, Validators.required],
                    commission: [this.data2[0].commission, Validators.required],
                    dealerid: [this.userDetails.id, Validators.required],
                 //   id: [this.data2[0]._id],
                    // width: ["", Validators.required]
                });


            }, error => {
                console.log("Oooops!");
            });
        this.addbannersizeformnew = fb.group({
            //username: [this.customerinfo.username, Validators.required],
            commissiontypen: ['', Validators.required],
            option_name: ['', Validators.required],
            priority: ['', Validators.required],
            commissionn: ['', Validators.required],
            dealeridn: [this.userDetails.id, Validators.required],
            base_price: [''],
            color_opiton: [''],
            car_feature: ['' ],
            upcoming_auction: [''],
            car_body_style: [''],
            car_auto_year: [''],
            car_mileage: [''],
        });



        this.http.get(this.serverUrl+'purchasetimelist')
            .subscribe(data => {
                //console.log(data);
                this.purchasetimilist=data.json();

                //console.log(this.purchasetimilist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'basepricelist')
            .subscribe(data => {
                console.log('base price list');
                console.log(data);
                this.basepricelist=data.json();

                //  console.log(this.basepricelist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);
                this.carlogosrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.carlogolist=data.json();

                // console.log(this.carlogolist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carbodystylelist')
            .subscribe(data => {
                //console.log(data);
                this.carbodystylelogosrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.carbodystylelist=data.json();

                // console.log(this.carbodystylelogosrc);


            }, error => {
                console.log("Oooops!");
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
        this.http.get(this.serverUrl+'listcarfeature')
            .subscribe(data => {
                this.carfeaturelist=data.json();
                this.carfeaturesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                console.log('car feature ');
                console.log(this.carfeaturelist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'colorlist')
            .subscribe(data => {
                this.colorlist=data.json();
                this.rows = Array.from(Array(Math.ceil(this.colorlist.length / 3)).keys())
                //this.carfeaturesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                console.log(this.carfeaturelist);

                let timeoutId = setInterval(() => {

                    //console.log('hello');

                    var x = $('.form-control_input').offset();

                    // alert('offset x'+ x.top +'offset y' + x.left );

                    $('#researchbymake').offset({top:x.top,left:x.left});


                }, 2000);


            }, error => {
                console.log("Oooops!");
            });


    }

    getbasepricelistlabel(item:any){

        var x:any;
        var string:any='';
        for(x in this.basepricelist){
            if($.inArray( this.basepricelist[x]._id, item )>-1){
                string+=this.basepricelist[x].baseprice+" /";
            }
        }
        return string;
    }

    getfeature(item:any){

        var x:any;
        var string:any='';
        for(x in this.carfeaturelist){
            if($.inArray( this.carfeaturelist[x]._id, item )>-1){
                string+=this.carfeaturelist[x].feature+" /";
            }
        }
        return string;
    }

    getmileage(val:any){
        //console.log(val);
        //carlogolist
        var z:any;
        for(z in this.carmileagelist){
            if(this.carmileagelist[z]._id==val) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }
    getmake(item:any){

        var x:any;
        var string:any='';
        for(x in this.carlogolist){
            if($.inArray( this.carlogolist[x]._id, item )>-1){
                string+=this.carlogolist[x].name+" /";
            }
        }
        return string;
    }
    getcoloroption(item:any){


        var x:any;
        var string:any='';
        for(x in this.colorlist){
            if($.inArray( this.colorlist[x]._id, item )>-1){
                string+=this.colorlist[x].color+" /";
            }
        }
        return string;
    }

    addnewcontractlogic(){

        $('.new_adminblockwrapper').removeClass('hide');
    }
    showcontraints(item:any){
        //alert(item);
        this.currentcontract=item;
        console.log('modal data');
        console.log(this.currentcontract);
        $('.cmodalbutton').click();

    }
    getnoofconstraints(item:any){
        var x:any;
        var counter:any=0;
        for(x in item){
            if(item[x] instanceof Array){
                if(item[x].length>0)counter++;

            }
        }
        return counter;
    }


    updateformsubmit(){
        let x:any;
        for(x in this.addbannersizeformnew.controls){
            this.addbannersizeformnew.controls[x].markAsTouched();

        }
        this.addbannersizeformnew.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.addbannersizeformnew.valid){
            //console.log(this.customersignupform.value);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();

            let link22 = this.serverUrl+'updateopencontract';
            this.addbannersizeformnew.value.base_price=this.updatepricearr;
            this.addbannersizeformnew.value.color_opiton=this.colorval;
            this.addbannersizeformnew.value.upcoming_auction=this.upcoming_auctionarr;
            this.addbannersizeformnew.value.car_body_style=this.updatebodystylearr;
            this.addbannersizeformnew.value.car_auto_year=this.autoyeararr;
            this.addbannersizeformnew.value.car_feature=this.updatecarfeaturearr;
            var submitdata1 = this.addbannersizeformnew.value;
            console.log(submitdata1);
            this.http.post(link22,submitdata1)
                .subscribe(data => {
                    console.log(this.addbannersizeformnew.value);
                    this.router.navigateByUrl('/manageopencontract(dealerheader:dealerheader//dealerfooter:dealerfooter)');


                }, error => {
                    console.log("Oooops!");
                });
        }
    }


    carcolorchange(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if(target.checked==true){
            this.colorval.push(target.value);
        }else{
            var arrindex = this.colorval.indexOf(target.value);
            this.colorval.splice(arrindex, 1);
        }
        console.log('color val');
        console.log(this.colorval);
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }
    autoyearchange(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if(target.checked==true){
            this.autoyeararr.push(target.value);
        }else{
            var arrindex1 = this.autoyeararr.indexOf(target.value);
            this.autoyeararr.splice(arrindex1, 1);
        }
        console.log('color auto year');
        console.log(this.autoyeararr);
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }

    upcoming_auctionchange(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if(target.checked==true){
            this.upcoming_auctionarr.push(target.value);
        }else{
            var arrindex = this.upcoming_auctionarr.indexOf(target.value);
            this.upcoming_auctionarr.splice(arrindex, 1);
        }
        console.log('upcoming_auctionarr val');
        console.log(this.upcoming_auctionarr);
        $('.logolabel'+target.value).toggleClass('selected');
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }
    updatebodystylearrf(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if(target.checked==true){
            this.updatebodystylearr.push(target.value);
        }else{
            var arrindex = this.updatebodystylearr.indexOf(target.value);
            this.updatebodystylearr.splice(arrindex, 1);
        }
        $(target).parent().parent().parent().toggleClass('selected');
        console.log('upcoming_auctionarr val');
        console.log(this.updatebodystylearr);
        $('#popup'+target.value).click();
        $('.logolabel'+target.value).toggleClass('selected');
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }

    openmakemodal() {
        $('.openmakemodal').click();
        $('.poppcheck').removeAttr('checked');
        $('.logolabel').removeClass('selected');

        let timeoutId = setTimeout(() => {
            //console.log('hello');
            var x: any;
            for (x in this.upcoming_auctionarr) {

                $('.popup' + this.upcoming_auctionarr[x]).prop('checked', true);
                $('.logolabel' + this.upcoming_auctionarr[x]).addClass('selected');
                //alert($('.popup' + this.upcoming_auctionarr[x]).val());
            }
        }, 3000);
    }

    upcoming_auctionchange1(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if($('#carlogo'+target.value).length==0) {
            if (target.checked == true) {
                this.upcoming_auctionarr.push(target.value);
            } else {
                var arrindex = this.upcoming_auctionarr.indexOf(target.value);
                this.upcoming_auctionarr.splice(arrindex, 1);
            }
        }
        console.log('upcoming_auctionarr val');
        console.log(this.upcoming_auctionarr);
        $('#carlogo'+target.value).click();
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }

    updatepricearray(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        //if($('#carlogo'+target.value).length==0) {
        if (target.checked == true) {
            this.updatepricearr.push(target.value);
        } else {
            var arrindex = this.updatepricearr.indexOf(target.value);
            this.updatepricearr.splice(arrindex, 1);
        }
        // }
        console.log('upcoming_auctionarr val');
        console.log(this.updatepricearr);
        //$('#carlogo'+target.value).click();
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }

    updatecarfeaturearray(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        //if($('#carlogo'+target.value).length==0) {
        if (target.checked == true) {
            this.updatecarfeaturearr.push(target.value);
        } else {
            var arrindex = this.updatecarfeaturearr.indexOf(target.value);
            this.updatecarfeaturearr.splice(arrindex, 1);
        }
        $(target).parent().parent().parent().toggleClass('selected');
        // }
        console.log('upcoming_auctionarr val');
        console.log(this.updatecarfeaturearr);
        //$('#carlogo'+target.value).click();
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }


    clickcarlogo(ev:any){

        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.attributes);
        console.log(target.attributes.id);
        console.log(target.attributes.logoid);
        console.log(target.parentElement.innerHTML);
        //console.log(target.gete);

        //target.hide();
        //console.log(this.elementRef.nativeElement.getElementById(target.attributes.logoid).attributes.id);
        //console.log(this.elementRef.nativeElement.getElementById(target.attributes.logoid).value);
        //jQuery(this.elementRef.nativeElement).find(target).html('6');

        //console.log(target.attrs.logoid);
        console.log(this.elementRef.nativeElement);

        console.log($(target).attr('src'));
        $('#'+$(target).attr('logoid')).click();
        //$(target).parent().toggleClass('selected');

    }
    deletecom(){
        let link = this.serverUrl+'deleteretailscommission';
        var submitdata = {dealerid: this.userDetails.id};
        this.http.post(link,submitdata)
            .subscribe(data => {
                console.log(data);
                // this.data = data.json();
                //console.log(this.data);
                // this.router.navigateByUrl('/bannersizelist');
                //  this.router.navigateByUrl('/addretailcommission(dealerheader:dealerheader//dealerfooter:dealerfooter)');

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


}


