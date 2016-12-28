import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation,OnDestroy,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/freecustomercreditcard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppFreecustomercreditcard implements OnInit, OnDestroy {
    // /@ViewChild(Modal) modal;
    customercreditform: FormGroup;
    myModal :ModalModule;
    data:any;

    http:Http;
    items:any;
    getExpyears:any;

    expMonths:any;
    getusastates:any;
    serverUrl:any;
    private customerInfo:CookieService;
    commonservices:AppCommonservices;
    customerinfo:any;
    private router: Router;
    package_image:any;
    details1:any;
    orderbyquery:any;
    orderbytype:any;
    randomstring: any;
    private sub: any;
    details: any;
    dealerusername: any;
    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,customerInfo:CookieService,router: Router,private route: ActivatedRoute ) {

        this.items = commonservices.getItems();
        this.getExpyears = commonservices.getExpyears();
        this.expMonths = commonservices.getMonths();
        //this.getusastates = commonservices.getusastates();
       // this.customerinfo=customerInfo.getObject('customerInfo');
        console.log(this.customerinfo)
        this.customerInfo=customerInfo;
        this.http=http;
        this.router = router;
        this.customerinfo=[];
        this.serverUrl = this.items[0].serverUrl;
        var parts = location.hostname.split('.');
        var sndleveldomain = parts[0];
        this.dealerusername=parts[0];
        let ids = {username: sndleveldomain};
        this.http.post(this.serverUrl + 'editdealerbyusername', ids)
            .subscribe(data => {
                this.details1 = data.json()[0];
                //  console.log('customer data');
                // console.log(this.details1);
                if(this.details1.filename) {
                    this.package_image = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.filename;
                }
                else {
                    this.package_image ="images/re_logo2.png";
                }

            }, error => {
                console.log("Oooops!");
            });
        this.sub = this.route.params.subscribe(params => {
            this.randomstring = params['randomstring']; // (+) converts string 'id' to a number
            let ids1={randomstring:this.randomstring};
            //setInterval(() => {
            this.http.post(this.serverUrl+'getcustomerbyrandomstring',ids1)
                .subscribe(data => {
                    this.details=data.json()[0];
                    this.customerinfo=this.details;
                    console.log(this.randomstring+ '------');
                    console.log(this.details);

                        this.customercreditform = fb.group({
                            username: [this.customerinfo.username, Validators.required],
                            dealerusername: [this.dealerusername, Validators.required],
                            address: ["", Validators.required],
                            state: ["", Validators.required],
                            city: ["", Validators.required],
                            fname: [this.customerinfo.fname, Validators.required],
                            lname: [this.customerinfo.lname, Validators.required],
                            email: [this.customerinfo.email, Validators.required],
                            phone: [this.customerinfo.phone, Validators.required],
                            zip: [this.customerinfo.zip, Validators.required]
                        });


                }, error => {
                    console.log("Oooops!");
                });
               // },2000)

            // In a real app: dispatch action to load the details here.
        });

        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                console.log(data);
               this.getusastates=data.json();
                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
            });


        this.customercreditform = fb.group({
            username: [this.customerinfo.username, Validators.required],
            dealerusername: [this.dealerusername, Validators.required],
            address: ["", Validators.required],
            state: ["", Validators.required],
            city: ["", Validators.required],
            fname: [this.customerinfo.fname, Validators.required],
            lname: [this.customerinfo.lname, Validators.required],
            email: [this.customerinfo.email, Validators.required],
            phone: [this.customerinfo.phone, Validators.required],
            zip: [this.customerinfo.zip, Validators.required]

        });
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.randomstring = params['randomstring']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    static validateTerms(control: FormControl){

        console.log('34324324');
        console.log(control.value);
        if(control.value==false){
            return { 'isTermsChecked': true };
        }

    }

    static validateEmail(control: FormControl){
        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
     }

    static validateState(control: FormControl){

        console.log(control.value+'stateval');
        if (control.value=='') {

            return { 'invalidState': true };
        }

    }
    submitform(){
        let x:any;
        for(x in this.customercreditform.controls){
            this.customercreditform.controls[x].markAsTouched();

        }
        this.customercreditform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customercreditform.valid){

            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'updatecustomerfree';
            var submitdata = this.customercreditform.value;

            console.log(submitdata);
          this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    console.log(this.customercreditform.value);
                    this.customerInfo.putObject('customerInfo',this.customercreditform.value);
                    this.router.navigateByUrl('/retailcustomerconnect');
                   // this.router.navigate(['/retailcustomerconnect']);


                }, error => {
                    console.log("Oooops!");
                });
        }
    }


}



