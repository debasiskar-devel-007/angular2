import {Component, NgModule, ViewChild, ViewContainerRef, ElementRef, ViewEncapsulation, OnInit} from '@angular/core';
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
//import {SimplePageScroll} from 'ng2-simple-page-scroll';

declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/retailcustomerconnect/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppRetailcustomerconnect implements OnInit {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    customersignupform: FormGroup;
    customersignupupdateform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private customerInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    customerinfo:any;
    getusastates:any;
    coockieData:CookieService;
    purchasetimilist:any;
    basepricelist:any;
    carlogolist:any;
    carlogosrc:any;
    carbodystylelist:any;
    carbodystylelogosrc:any;
    carautoyearlist:any;
    carmileagelist:any;
    carfeaturelist:any;
    carfeaturesrc:any;
    private colorlist:any;
    private rows:any;
    private colorval:Array<any>;
    private static colorval:Array<any>;
    private upcoming_auctionarr:Array<any>;
    private updatebodystylearr:Array<any>;
    private updatepricearr:Array<any>;
    private updatecarfeaturearr:Array<any>;
    private elementRef: ElementRef;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,customerInfo:CookieService,router: Router,appcomponent:AppComponent,elementRef: ElementRef  ) {
        this.router=router;
        this.elementRef=elementRef;
        this.colorval=[];
        this.upcoming_auctionarr=[];
        this.updatebodystylearr=[];
        this.updatepricearr=[];
        this.updatecarfeaturearr=[];
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.customerinfo=customerInfo.getObject('customerInfo');
        console.log(this.customerinfo);
        this.customerInfo=customerInfo;
        this.serverUrl = this.items[0].serverUrl;
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                //console.log(data);
                this.getusastates=data.json();

                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });



        this.customersignupform = fb.group({
            username: [this.customerinfo.username, Validators.required],
            fname: [this.customerinfo.fname, Validators.required],
            lname: [this.customerinfo.lname, Validators.required],
            email: [this.customerinfo.email, Validators.required],
            //email: [this.customerinfo.email, AppRetailcustomerconnect.validateEmail()],
            confirm_email: [''],
            phone: [this.customerinfo.phone, Validators.required],
            address: [this.customerinfo.address, Validators.required],
            addressline2: [''],
            city: [this.customerinfo.city, Validators.required],
            zip: [this.customerinfo.zip, Validators.required],
            company_name: [''],
            alt_phone: [''],
            state: [this.customerinfo.state, Validators.required],
            term: [this.customerinfo.term, AppRetailcustomerconnect.validateTerms]
        });

        this.customersignupupdateform = fb.group({
            username: [this.customerinfo.username, Validators.required],
            send_mail: ['', Validators.required],
            retail_calculator: ['', Validators.required],
            purchase_time: ['', Validators.required],
            base_price: ['', Validators.required],
            color_opiton: ['',Validators.required],
            upcoming_auction: ['',Validators.required],
            car_body_style: ['',Validators.required],
            car_auto_year: ['',Validators.required],
            car_mileage: ['',Validators.required],
            car_feature: ['',Validators.required],
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
                //console.log(data);
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


            }, error => {
                console.log("Oooops!");
            });


    }
    ngOnInit() {
        var el = this.elementRef.nativeElement;
        console.log('in native');
        console.log(el);
    }


     static validateTerms(control: FormControl){
         console.log('test');

        if(control.value==false){
            return { 'isTermsChecked': true };
        }
     }
    static validcoloroptions(control: FormControl){
        console.log('test');
        //console.log(this.colorval);

        if(control.value==1 ||control.value.length==false){
            return { 'validcoloroptions': true };
            //return true;
        }
    }

    static validateEmail(control: FormControl){

        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
    }
    submitform(){
        console.log(this.customersignupform.value);
        let x:any;
        for(x in this.customersignupform.controls){
            this.customersignupform.controls[x].markAsTouched();

        }
        this.customersignupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        //if(this.customersignupform.valid){
        if(this.customersignupform.valid){

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecustomer2';
            var submitdata = this.customersignupform.value;
            console.log(link);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    // console.log(data[0]);
                    this.customerInfo.putObject('customerInfo',this.customersignupform.value);
                   // this.coockieData.removeAll();
                    this.router.navigateByUrl('/retailcustomerconnect');
                    // this.router.navigate(['/retailcustomerconnect']);


                }, error => {
                    console.log("Oooops!");
                });
        }
    }
    updateformsubmit(){
        let x:any;
        for(x in this.customersignupupdateform.controls){
            this.customersignupupdateform.controls[x].markAsTouched();

        }
        this.customersignupupdateform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupupdateform.valid){
            //console.log(this.customersignupform.value);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecustomer';
            var submitdata = this.customersignupupdateform.value;
            console.log(submitdata);
           /* this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    console.log(this.customersignupupdateform.value);
                   // this.customerInfo.putObject('customerInfo',this.customersignupupdateform.value);
                    this.router.navigateByUrl('/retailcustomerconnect');
                    // this.router.navigate(['/retailcustomerconnect']);


                }, error => {
                    console.log("Oooops!");
                });*/
        }
    }

    goto(){

        console.log(this.customersignupupdateform.value);
        let x:any;
        for(x in this.customersignupupdateform.controls){
            this.customersignupupdateform.controls[x].markAsTouched();

        }
        this.customersignupupdateform.markAsDirty();
        console.log('form value ...');
        console.log(this.customersignupupdateform.value);
       //this.router.navigate(['/finance']) ;
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
        $('.logolabel'+target.value).toggleClass('selected');
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
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

}


