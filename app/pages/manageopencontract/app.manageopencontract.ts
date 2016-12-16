import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation,OnInit, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';





@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/manageopencontract/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppManageopencontract {
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


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,userdetails:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
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

        let link = this.serverUrl+'getretailcommissionlist';


        this.http.get(link)
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
        /*this.addbannersizeform = fb.group({
            commissiontype: ["", Validators.required],
            commission: [this.data2[0].commission, Validators.required],
            dealerid: [this.userDetails.id, Validators.required],
            // width: ["", Validators.required]
        });*/



        //this.router.navigate(['/about']);
    }




    submitform(){
        let x:any;
        for(x in this.addbannersizeform.controls){
            this.addbannersizeform.controls[x].markAsTouched();

        }
       // console.log(this.addsharelinkform.dirty);
        this.addbannersizeform.markAsDirty();
        if(this.addbannersizeform.valid){
           let link = this.serverUrl+'modifyretailscommission';
            var submitdata = this.addbannersizeform.value;
            this.http.post(link,submitdata)
                .subscribe(data => {
                    console.log(data);
                   // this.data = data.json();
                    //console.log(this.data);
                   // this.router.navigateByUrl('/bannersizelist');
                    this.router.navigateByUrl('/manageopencontract(dealerheader:dealerheader//dealerfooter:dealerfooter)');

                }, error => {
                    console.log("Oooops!");
                });

            //this.navCtrl.push(ProfilePage);
        }
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
}


