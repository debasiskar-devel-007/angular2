import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, OnInit} from '@angular/core';
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
declare var $:any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/addmanageposts/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppAddmanageposts implements OnInit {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private progressvideo: number = 0;
    private response: any = {};
    private responsevideo: any = {};
    myModal :ModalModule;
    addmembershippackageform: FormGroup;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    getusastates:any;
    uploadedfilesrc:any;
    uploadedvideosrc:any;
    ckeditorContent:any;
    private userInfo:any;
    posttypelist:any;
    inventorylist:any;
    carlogolist:any;
    carlist:any;
    openchannellist:any;
    openchannelarr:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.ckeditorContent = '';
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.userInfo=userInfo.getObject('userdetails');
        this.posttypelist=[];
        this.inventorylist=[];
        this.carlogolist=[];
        this.carlist=[];
        this.openchannellist=[];
        this.openchannelarr=[];
        let link = this.serverUrl+'openchannelmanagementlist';
        let ids={dealereusername:this.userInfo.username};
        this.http.post(link,ids)
            .subscribe(data1 => {
                this.openchannellist = data1.json();
                console.log(this.data);
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                console.log(this.data);
               // this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carlist')
            .subscribe(data => {
                this.carlist=data.json();

                var y:any;
                for(y in this.carlist){
                    this.carlist[y].make=this.getmakename(this.carlist[y].carlogolist);
                    this.inventorylist.push(this.carlist[y]);
                }
                console.log('invenory list');
                console.log(this.inventorylist);
            }, error => {
                console.log("Oooops!");
            });

        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                this.carlogolist=data.json();
            }, error => {
                console.log("Oooops!");
            });

        this.posttypelist=[
            {name:'Text'},
            {name:'Image'},
            {name:'Video'},
            {name:'Inventory'},
            ];
        this.addmembershippackageform = fb.group({
            dealerusername: [this.userInfo.username, Validators.required],
            title: ['', Validators.required],
            posttype: ['', Validators.required],
            is_active: [''],
            priority: ['', Validators.required],
            postbody: ['', Validators.required],
            is_open_channel: [''],
            openchannel: [''],

        });


    }
    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.basicOptions = {
            url: this.serverUrl+'uploads'
        };
    }

    handleUpload(data: any): void
    {

        //console.log(data.progress.percent);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent ;
            if(data.progress.percent==100){
                console.log(data.response);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.addmembershippackageform.patchValue({postbody: data.response});
                    this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                }
            }
        });
    }
    handleUploadvideo(data: any): void
    {

        console.log(data);
        this.zone.run(() => {
            this.responsevideo = data;
            this.progressvideo = data.progress.percent ;
            console.log(data.progress.percent);
            if(data.progress.percent==100){
                console.log(data.responsevideo);
                //console.log(data.response.json());
                //console.log(data.response.filename);
                if(typeof (data.response)!='undefined') {
                    this.addmembershippackageform.patchValue({postbody: data.response});
                    this.uploadedvideosrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + data.response;
                    console.log(this.uploadedvideosrc);
                }
            }
        });
    }

    onChange(event:any){
        //alert(99);
        //(<FormControl>this.addadminform.controls['body']).updateValue(this.ckeditorContent);
        this.addmembershippackageform.patchValue({postbody: this.ckeditorContent})

    }
    getmakename(makeid:any){

            var x1:any;
            for(x1 in this.carlogolist){
                if(this.carlogolist[x1]._id==makeid) return this.carlogolist[x1].name;
            }
            return 'N/A';

    }

    submitform1(){

        let x:any;
        for(x in this.addmembershippackageform.controls){
            this.addmembershippackageform.controls[x].markAsTouched();

        }
        this.addmembershippackageform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.addmembershippackageform.valid){
            //console.log(11);
            //var headers = new Headers();
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //this.items = this.commonservices.getItems();
            let link = this.serverUrl+'addmanagepost';
            this.addmembershippackageform.value.openchannel=this.openchannelarr;
            var submitdata = this.addmembershippackageform.value;
            console.log(submitdata);
           this.http.post(link,submitdata)
                .subscribe(data => {
                     this.router.navigateByUrl('/managepostslist(dealerheader:dealerheader//dealerfooter:dealerfooter)');

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

    patchtinventid(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
        console.log(tval);
        this.addmembershippackageform.patchValue({postbody: tval});

    }
    changepostype(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
        if(tval=="Text"){
          $('.textcontent').removeClass('hide');
            $('.uploadimage').addClass('hide');
            $('.uploadvideo').addClass('hide');
            $('.inventoryselectbox').addClass('hide');
        }
        if(tval=="Image"){
          $('.uploadimage').removeClass('hide');
            $('.textcontent').addClass('hide');
            $('.uploadvideo').addClass('hide');
            $('.inventoryselectbox').addClass('hide');
        }
        if(tval=="Video"){
          $('.uploadvideo').removeClass('hide');
            $('.textcontent').addClass('hide');
            $('.inventoryselectbox').addClass('hide');
            $('.uploadimage').addClass('hide');
        }
        if(tval=="Inventory"){
          $('.inventoryselectbox').removeClass('hide');
            $('.uploadvideo').addClass('hide');
            $('.textcontent').addClass('hide');
            $('.uploadimage').addClass('hide');
        }
    }
    openchannelchange(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        console.log(target.value);
        console.log(target.checked);
        console.log(ev);
        if(target.checked==true){

            this.openchannelarr.push(target.value);
        }else{
            var arrindex = this.openchannelarr.indexOf(target.value);
            this.openchannelarr.splice(arrindex, 1);
        }
        //$('.logolabel'+target.value).toggleClass('selected');
        //if(this.colorval.length==0)this.customersignupupdateform.patchValue({color_opiton: 1})
        //if(this.colorval.length>0)this.customersignupupdateform.patchValue({color_opiton: 2})
    }
    openchannelchangecheck(ev:any){
        var target = ev.target || ev.srcElement || ev.originalTarget;
        if(target.checked==true){

            $('.signupcheckbox1').removeClass('hide');
        }
        else{
            $('.signupcheckbox1').addClass('hide');
        }
    }
}


