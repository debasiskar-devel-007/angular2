import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
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
    templateUrl:'app/pages/editfinance/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppEditfinance implements OnInit {

    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    customersignupform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private customerInfo:CookieService;
    private userinfo:CookieService;
    private details1:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    customerinfo:any;
    getusastates:any;
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
    package_image:any;
    private listcarautomileage:any;
    private carautoyearlist:any;
    private modellist:any;
    private carlogolist:any;
    private carlist:any;
    private upcoming_auctionarr:Array<any>;
    private autoyeararr:Array<any>;
    randstring:any;
    err:any;
    details:any;
    userInfo:any;
    id:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userinfo:CookieService,router: Router,appcomponent:AppComponent,elementRef: ElementRef  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userinfo.getObject('userdetails');
        this.err='';
        this.details=[];
        this.randstring= 'ab8gr';
        console.log('string -');
       // console.log(this.randstring);

        this.autoyeararr=[];
        this.upcoming_auctionarr=[];
        this.http.get(this.serverUrl+'getusastates')
            .subscribe(data => {
                console.log(data);
                this.getusastates=data.json();
                console.log(this.getusastates);


            }, error => {
                console.log("Oooops!");
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

                if(this.details.previousresidence_check==1){
                  $('.prevses').removeClass('hide');
                }
                if(this.details.mailingaddress_check==1){
                  $('.mailadd').removeClass('hide');
                }
                if(this.details.previousemployment_check==1){
                  $('.paddingtop26').removeClass('hide');
                }

                this.customersignupform = fb.group({
                    username: [this.details.username, Validators.required],
                    fname: [this.details.fname, Validators.required],
                    mname: [this.details.mname],
                    lname: [this.details.lname, Validators.required],
                    email: [this.details.email, Validators.required],
                    //email: [this.customerinfo.email, AppRetailcustomerconnect.validateEmail()],
                    phone: [this.details.phone, Validators.required],
                    fax: [this.details.fax, Validators.required],
                    dob: [this.details.dob],
                    mother_maiden_name: [this.details.mother_maiden_name],
                    social_security: [this.details.social_security],
                    address: [this.details.address, Validators.required],
                    addressline2: [this.details.addressline2],
                    city: [this.details.city, Validators.required],
                    state: [this.details.state, Validators.required],
                    zip: [this.details.zip, Validators.required],
                    previousresidence_check: [this.details.previousresidence_check],
                    primary_residence_year: [this.details.primary_residence_year],
                    primary_residence_month: [this.details.primary_residence_month],
                    primary_residence_type: [this.details.primary_residence_type],
                    primary_residence_monthly_payment: [this.details.primary_residence_monthly_payment],
                    primary_year_homeowner: [this.details.primary_year_homeowner],
                    previous_address: [this.details.previous_address],
                    previous_addressline2: [this.details.previous_addressline2],
                    previous_residence_year: [this.details.previous_residence_year],
                    previous_residence_month: [this.details.previous_residence_month],
                    previous_zip: [this.details.previous_zip],
                    previous_state: [this.details.previous_state],
                    previous_city: [this.details.previous_city],
                    mailingaddress_check: [this.details.mailingaddress_check],
                    mailing_address: [this.details.mailing_address],
                    mailing_addressline2: [this.details.mailing_addressline2],
                    mailing_state: [this.details.mailing_state],
                    mailing_city: [this.details.mailing_city],
                    mailing_zip: [this.details.mailing_zip],
                    occupation: [this.details.occupation],
                    employer: [this.details.employer],
                    payment_type: [this.details.payment_type],
                    hire_date: [this.details.hire_date],
                    work_phone: [this.details.work_phone],
                    self_employed: [this.details.self_employed],
                    gross_monthly_income: [this.details.gross_monthly_income],
                    employment_year: [this.details.employment_year],
                    employment_month: [this.details.employment_month],
                    employment_address: [this.details.employment_address],
                    employment_addressline2: [this.details.employment_addressline2],
                    employment_city: [this.details.employment_city],
                    employment_state: [this.details.employment_state],
                    employment_zip: [this.details.employment_zip],
                    previousemployment_check: [this.details.previousemployment_check],
                    previous_employer: [this.details.previous_employer],
                    previous_employment_year: [this.details.previous_employment_year],
                    previous_employment_month: [this.details.previous_employment_month],
                    previous_employment_address: [this.details.previous_employment_address],
                    previous_employment_addressline2: [this.details.previous_employment_addressline2],
                    previous_employment_city: [this.details.previous_employment_city],
                    previous_employment_state: [this.details.previous_employment_state],
                    previous_employment_zip: [this.details.previous_employment_zip],
                    other_monthly_income: [this.details.other_monthly_income],
                    checking_account: [this.details.checking_account],
                    checking_account_balance: [this.details.checking_account_balance],
                    other_income_source: [this.details.other_income_source],
                    saving_account: [this.details.saving_account],
                    saving_account_balnace: [this.details.saving_account_balnace],
                    other_bank_name: [this.details.other_bank_name],
                    other_liquid_asset: [this.details.other_liquid_asset],
                    other_liquid_asset_source: [this.details.other_liquid_asset_source],
                    application_info_check: [this.details.application_info_check],
                    co_applicant: [this.details.co_applicant],
                    vehicle_trade: [this.details.vehicle_trade],
                    loan_check: [this.details.loan_check],
                    listing_id: [this.details.listing_id],
                    location_id: [this.details.location_id],
                    license_number: [this.details.license_number],
                    captcha: ['',AppEditfinance.validCaptcha],
                     loan_down_payment: [this.details.loan_down_payment],
                    loan_vehicle_cost: [this.details.loan_vehicle_cost],
                    loan_payment_amount: [this.details.loan_payment_amount],
                    loan_repayment_term: [this.details.loan_repayment_term],
                    loan_month: [this.details.loan_month],
                    comment: [this.details.comment],
                    signature: ['', Validators.required],
                    is_active: [this.details.is_active, Validators.required],
                });
                /* this.ckeditorContent = this.details.notes;
                 console.log(this.customersignupupdateform );*/

            }, error => {
                console.log("Oooops!");
            });




        this.customersignupform = fb.group({
            username: ['', Validators.required],
            fname: ['', Validators.required],
            mname: [''],
            lname: ['', Validators.required],
            email: ['', Validators.required],
            //email: [this.customerinfo.email, AppRetailcustomerconnect.validateEmail()],
            phone: ['', Validators.required],
            fax: ['', Validators.required],
            dob: [''],
            mother_maiden_name: [''],
            social_security: [''],
            address: ['', Validators.required],
            addressline2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            previousresidence_check: [''],
            primary_residence_year: [''],
            primary_residence_month: [''],
            primary_residence_type: [''],
            primary_residence_monthly_payment: [''],
            primary_year_homeowner: [''],
            previous_address: [''],
            previous_addressline2: [''],
            previous_residence_year: [''],
            previous_residence_month: [''],
            previous_zip: [''],
            previous_state: [''],
            previous_city: [''],
            mailingaddress_check: [''],
            mailing_address: [''],
            mailing_addressline2: [''],
            mailing_state: [''],
            mailing_city: [''],
            mailing_zip: [''],
            occupation: [''],
            employer: [''],
            payment_type: [''],
            hire_date: [''],
            work_phone: [''],
            self_employed: [''],
            gross_monthly_income: [''],
            employment_year: [''],
            employment_month: [''],
            employment_address: [''],
            employment_addressline2: [''],
            employment_city: [''],
            employment_state: [''],
            employment_zip: [''],
            previousemployment_check: [''],
            previous_employer: [''],
            previous_employment_year: [''],
            previous_employment_month: [''],
            previous_employment_address: [''],
            previous_employment_addressline2: [''],
            previous_employment_city: [''],
            previous_employment_state: [''],
            previous_employment_zip: [''],
            other_monthly_income: [''],
            checking_account: [''],
            checking_account_balance: [''],
            other_income_source: [''],
            saving_account: [''],
            saving_account_balnace: [''],
            other_bank_name: [''],
            other_liquid_asset: [''],
            other_liquid_asset_source: [''],
            application_info_check: [''],
            co_applicant: [''],
            vehicle_trade: [''],
            loan_check: [''],
            listing_id: [''],
            location_id: [''],
            license_number: [''],
            captcha: ['',AppEditfinance.validCaptcha],
           /* vin: [''],
            car_mileage: [this.customerinfo.car_mileage],
            upcoming_auction: [this.customerinfo.upcoming_auction],
            model: [''],
            car_auto_year: [this.customerinfo.car_auto_year],*/
            loan_down_payment: [''],
            loan_vehicle_cost: [''],
            loan_payment_amount: [''],
            loan_repayment_term: [''],
            loan_month: [''],
            comment: [''],
            signature: ['', Validators.required],
            is_active: ['', Validators.required],
        });

        console.log('finance form');
        console.log(this.customersignupform);
        this.http.get(this.serverUrl+'listcarautomileage')
            .subscribe(data => {
                this.listcarautomileage=data.json();
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
        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);

                this.carlogolist=data.json();

                // console.log(this.carlogolist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carlist')
            .subscribe(data => {
                //console.log(data);

                this.carlist=data.json();

                // console.log(this.carlogolist);


            }, error => {
                console.log("Oooops!");
            });


    }
    ngOnInit(){
        console.log('on init');
    };
    static validCaptcha(control: FormControl){

        console.log(control.value+'stateval');
        if (control.value=='') {

            return { 'invalidState': true };
        }
        if($('#sign').text()!=control.value){
            return { 'invalidState': true };
        }

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

    static validateTerms(control: FormControl){
        if(control.value==false){
            return { 'isTermsChecked': true };
        }
    }
    submitform1(){
        let x:any;
        for(x in this.customersignupform.controls){
            this.customersignupform.controls[x].markAsTouched();

        }
        this.customersignupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupform.valid){
          var sign1=  $('#sign').html();
           // if(sign1==this.customersignupform.value.signature){
                let link = this.serverUrl+'updatecustomerfinance';
                var submitdata = this.customersignupform.value;
                console.log(submitdata);
                this.http.post(link,submitdata)
                    .subscribe(data => {
                        $('#financeupdateModal').modal('show');
                        // /this.data1.response = data.json();
                       // console.log(this.customersignupform.value);
                     //   this.customerInfo.putObject('customerInfo',this.customersignupform.value);
                        //this.router.navigateByUrl('/customerlogin');


                    }, error => {
                        console.log("Oooops!");
                    });
           // }
           /* else{
                this.err="Capthca does not macth";
            }*/
        console.log(this.customersignupform.value);
         /*   this.customersignupform.value.upcoming_auction=this.upcoming_auctionarr;

            this.customersignupform.value.car_auto_year=this.autoyeararr;
            //var headers = new Headers();*/
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();

        }
    }


    getrandomString() {

       var charss='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var length=5;
        var result = '';
        for (var i = length; i > 0; --i) result += charss[Math.round(Math.random() * (charss.length - 1))];
        this.randstring =result;
    }
    mailingaddress(){

    if($('#mailingaddressradio').is(':checked')){
    $('.mailadd').removeClass('hide');
    }
    else{
        $('.mailadd').addClass('hide');
    }
    }
    prevresidance(){
        if($('#prevresidentradio').is(':checked')){
            $('.prevses').removeClass('hide');
        }
        else{
            $('.prevses').addClass('hide');
        }
    }
    employment(){
        if($('#prevemployeeradio').is(':checked')){
            $('.paddingtop26').removeClass('hide');
        }
        else{
            $('.paddingtop26').addClass('hide');
        }
    }
}


