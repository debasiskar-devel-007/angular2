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
    templateUrl:'app/pages/editprefference/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditprefference implements OnInit {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    customersignupform: FormGroup;
    customersignupupdateform: FormGroup;
    colorform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private customerInfo:CookieService;
    private userinfo:CookieService;
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
    banner_image:any;
    name:any;
    zip:any;
    description:any;
    address1:any;
    city:any;
    state:any;
    phone:any;
    websiteurl:any;
    email:any;
    query:any;
    userInfo:any;
    details:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userinfo:CookieService,customerInfo:CookieService,router: Router,appcomponent:AppComponent,elementRef: ElementRef  ) {
        //table_textbox
        $('.table_textbox').css('display','none');
        this.router=router;
        this.elementRef=elementRef;
        this.colorval=[];
        this.autoyeararr=[];
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
       // this.userInfo=userInfo;
        this.userInfo=userinfo.getObject('userdetails');
        console.log(this.customerinfo);
        this.details=[];
        this.details1=[];
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

 /*       var parts = location.hostname.split('.');
        var sndleveldomain = parts[0];

        let idss = {username: sndleveldomain};
        this.http.post(this.serverUrl + 'editdealerbyusername', idss)
            .subscribe(data => {
                this.details1 = data.json()[0];
                console.log('dealer details');
                console.log(this.details1);
                this.name=this.details1.fname+' '+this.details1.lname;
                this.description=this.details1.description;
                this.address1=this.details1.address;
                //  console.log(this.address1);
                this.city=this.details1.city;
                this.state=this.details1.state;
                this.zip=this.details1.zip;
                this.phone=this.details1.phone;
                this.websiteurl=this.details1.websiteurl;
                this.email=this.details1.email;

                if(this.details1.filename) {
                    this.package_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.filename;
                }
                else {
                    this.package_image ="images/re_logo2.png";
                }

                if(this.details1.banner) {
                    this.banner_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.banner;
                }   else {
                    this.banner_image= 'images/img_customersignup_car.png';
                }

            }, error => {
                console.log("Oooops!");
            });*/

        this.colorform = fb.group({
            color: ["", Validators.required],
            priority: [20],
            is_active: [1]
        });

        this.id = this.userInfo.username; // (+) converts string 'id' to a number
        let ids={username: this.id};
        this.http.post(this.serverUrl+'editdcustomerbyusername',ids)
            .subscribe(data => {
                this.details=data.json()[0];
                console.log('customer details');
                console.log(this.details);
                console.log(ids);
                /* this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details.filename;*/
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

                this.customersignupupdateform = fb.group({

                    username: [this.userInfo.username, Validators.required],
                    fname: [this.details.fname, Validators.required],
                    lname: [this.details.lname, Validators.required],
                    email: [this.details.email, Validators.required],
                    phone: [this.details.phone, Validators.required],
                    address: [this.details.address, Validators.required],
                    addressline2: [this.details.addressline2],
                    city: [this.details.city, Validators.required],
                    zip: [this.details.zip, Validators.required],
                    company_name: [this.details.company_name],
                    alt_phone: [this.details.alt_phone],
                    state: [this.details.state, Validators.required],
                    term: [this.details.term, AppEditprefference.validateTerms],
                    send_mail: [this.details.send_mail, Validators.required],
                    retail_calculator: [this.details.retail_calculator, Validators.required],
                    purchase_time: [this.details.purchase_time, Validators.required],
                    base_price: [this.details.base_price, Validators.required],
                    color_opiton: [this.details.color_opiton,Validators.required],
                    upcoming_auction: [this.details.upcoming_auction,Validators.required],
                    car_body_style: [this.details.car_body_style,Validators.required],
                    car_auto_year: [this.details.car_auto_year,Validators.required],
                    car_mileage: [this.details.car_mileage,Validators.required],
                    car_feature: [this.details.car_feature,Validators.required],
                  /*  qualify_finance: [this.details.qualify_finance,Validators.required],*/

                });
                /* this.ckeditorContent = this.details.notes;
                 console.log(this.customersignupupdateform );*/

            }, error => {
                console.log("Oooops!");
            });






        this.customersignupupdateform = fb.group({

            username: [this.userInfo.username, Validators.required],
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            addressline2: [''],
            city: ['', Validators.required],
            zip: ['', Validators.required],
            company_name: [''],
            alt_phone: [''],
            state: ['', Validators.required],
            term: [this.details.term, AppEditprefference.validateTerms],
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
          /*  qualify_finance: ['',Validators.required],*/

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

                let timeoutId = setInterval(() => {

                    //console.log('hello');

                    var x = $('.form-control_input').offset();

                    // alert('offset x'+ x.top +'offset y' + x.left );

                  //  $('#researchbymake').offset({top:x.top,left:x.left});


                }, 2000);


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

            let link22 = this.serverUrl+'updatecustomerprefference';
            this.customersignupupdateform.value.base_price=this.updatepricearr;
            this.customersignupupdateform.value.color_opiton=this.colorval;
            this.customersignupupdateform.value.upcoming_auction=this.upcoming_auctionarr;
            this.customersignupupdateform.value.car_body_style=this.updatebodystylearr;
            this.customersignupupdateform.value.car_auto_year=this.autoyeararr;
            this.customersignupupdateform.value.car_feature=this.updatecarfeaturearr;
            var submitdata1 = this.customersignupupdateform.value;
            console.log(submitdata1);
            this.http.post(link22,submitdata1)
                .subscribe(data => {
                    /*let timeoutId = setTimeout(() => {*/
                    $('#prefferenceupdateModal').modal('show');
                  /*  }, 4000);*/

                    // if(this.customersignupupdateform.value.qualify_finance==1){
                    //     this.router.navigate(['/finance']);
                    // }
                    // else{
                    //     this.router.navigateByUrl('/customerdashboard(customerheader:customerheader//customerfooter:customerfooter)');
                    // }
                    // this.customerInfo.putObject('customerInfo',this.customersignupupdateform.value);

                    // this.router.navigate(['/retailcustomerconnect']);


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
    colorcheck(){

        if($('#other1').is(':checked')){


            $('.table_textbox').removeClass('hide');
            // $('#other1').val(' ');
        }
        else{
            $('.table_textbox').addClass('hide');
        }
    }

    updatecolorform(){
        console.log('add color');
        console.log(this.colorform.value);
        let x:any;
        for(x in this.colorform.controls){
            this.colorform.controls[x].markAsTouched();

        }
        this.colorform.markAsDirty();
        if(this.colorform.valid){
            let link = this.serverUrl+'addcolor';
            var submitdata = this.colorform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data2 => {
                    console.log('Before Push');
                    console.log(this.colorval);

                    this.colorlist.push({'_id':data2.json()[0],'color':submitdata.color,'priority':submitdata.priority,'is_active':submitdata.is_active});
                    this.rows = Array.from(Array(Math.ceil(this.colorlist.length / 3)).keys());
                    $('#'+data2.json()[0]).click();
                    console.log('After Push');
                    this.colorval.push(data2.json()[0]);
                    // $('#'+data2.json()[0]).click();
                    //$('#'+data2.json()).prop('checked', true);
                    console.log(this.colorval);
                    $('.table_textbox').addClass('hide');
                    $('#other1').prop('checked',false);
                    $('.colclass').val('');

                    /* this.http.get(this.serverUrl+'colorlist')
                     .subscribe(data => {
                     this.colorlist=data.json();
                     this.rows = Array.from(Array(Math.ceil(this.colorlist.length / 3)).keys())
                     //this.carfeaturesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";


                     let timeoutId = setInterval(() => {

                     //console.log('hello');

                     var x = $('.form-control_input').offset();

                     // alert('offset x'+ x.top +'offset y' + x.left );

                     $('#researchbymake').offset({top:x.top,left:x.left});


                     }, 2000);


                     }, error => {
                     console.log("Oooops!");
                     });*/
                    // this.router.navigateByUrl('/colorlist(adminheader:adminheader//adminfooter:adminfooter)')

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}


