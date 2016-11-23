import {
    Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, OnInit,
    OnDestroy, Inject, Renderer
} from '@angular/core';
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
    templateUrl:'app/pages/customerheader/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomerheader implements OnInit  {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private response: any = {};
    updatecustomerform: FormGroup;
    myModal :ModalModule;
    data:any;
    data2:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    loginerror:any;
    userDetails:any;
    coockieData:CookieService;
    package_image:any;
    details1:any;
    details12:any;
    uploadedfilesrc:any;
    customerimage:any;
    @ViewChild('modalclose')
    private modalclose:any;



    constructor(@Inject(Renderer) private renderer: Renderer,fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router  ) {

//console.log(userdetails);
        this.details12='';
        this.details1='';
        this.coockieData=userdetails;
        this.items = commonservices.getItems();
        this.router=router;

        this.userDetails=userdetails.getObject('userdetails');
        this.serverUrl = this.items[0].serverUrl;
       // console.log(userdetails.getObject('userdetails'));
        console.log(this.userDetails.username);
        if(this.userDetails.filename!=undefined){
            this.customerimage = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.userDetails.filename;
        }
        else{
            this.customerimage= 'images/logo_61.png';
        }
        this.http=http;
        let idss = {username: this.userDetails.username};
        this.http.post(this.serverUrl + 'editdcustomerbyusername', idss)
            .subscribe(data2 => {
                this.details12 = data2.json()[0];

                //console.log(this.details12.dealerusername);
                let ids = {username: this.details12.dealerusername};
                this.http.post(this.serverUrl + 'editdealerbyusername', ids)
                    .subscribe(data => {
                        this.details1 = data.json()[0];
                       // console.log(this.details1);
                       // console.log(this.details1.filename);
                       // if(this.userDetails.filename!=undefined) {
                            this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.details1.filename;
                       // }

                    }, error => {
                        console.log("Oooops!");
                    });

            }, error => {
                console.log("Oooops!");
            });
     //   console.log(this.details12.dealerusername);

        if(typeof(this.userDetails)=='undefined'){
            this.router.navigateByUrl('/adminlogin');
            return;
        }
        this.updatecustomerform = fb.group({
            filename: [""],
            username: [this.userDetails.username],

        });


    }
    handleUpload(data: any): void {
        //console.log(data.progress.percent);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent ;
            if(data.progress.percent==100){
                console.log(data.response);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.updatecustomerform.patchValue({filename: data.response});
                    this.customerimage = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }
    ngOnInit() {

        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }



    logout(){

        this.coockieData.removeAll();
        this.router.navigateByUrl('/customerlogin');

    }
    getUserFullname(){
        this.userDetails=this.coockieData.getObject('userdetails');
        if(typeof(this.userDetails)!='undefined'){
            return this.userDetails.userfullname;
        }
        else{
            return '';
        }
    }

    submitform(){
        let x:any;
        for(x in this.updatecustomerform.controls){
            this.updatecustomerform.controls[x].markAsTouched();

        }
        this.updatecustomerform.markAsDirty();
        if(this.updatecustomerform.valid){
            let link = this.serverUrl+'updatecustomerimage';
            var submitdata = this.updatecustomerform.value;
            console.log(submitdata);
            this.http.post(link,submitdata)
                .subscribe(data => {
                    this.userDetails=this.coockieData.getObject('userdetails');
                    // /this.data1.response = data.json();
                   // let userdet={id:this.userDetails.id,username:this.userDetails.username,useremail:this.userDetails.email,userrole:'customer',userfullname:this.userDetails.fname+' '+this.userDetails.lname,filename:this.updatecustomerform.value.filename}

                   // console.log(userdet);
                    this.userDetails.filename=this.updatecustomerform.value.filename;
                    this.coockieData.putObject('userdetails', this.userDetails);
                    //modalclose.click();
                    this.renderer.invokeElementMethod(this.modalclose.nativeElement, 'click', []);
                    this.router.navigateByUrl('/customerdashboard(customerheader:customerheader//customerfooter:customerfooter)');

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}


