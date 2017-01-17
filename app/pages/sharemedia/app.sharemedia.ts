import {Component, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation, Renderer, Inject} from '@angular/core';
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
declare var Clipboard: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/sharemedia/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppSharemedia{
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    // /@ViewChild('lgModal') sharemediaModal;

    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private userInfo:CookieService;
    id:any;
    item:any;
    private messages:any;
    p:any;
    pagec:any;
    orderbyquery:any;
    orderbytype:any;
    sharefilesrc:any;
    appcomponent:AppComponent;
    tempdata:Array<any>;
    userdetails:any;
    bannerdata:any;
    bannerfilesrc:any;
    dataarr:any;
    username:any;
    details12:any;
    textarealink:any;

    //sharemediaModal:any;
    @ViewChild('all_m')
    private allMElementRef:any;
    private mediaid:any;

    constructor(@Inject(Renderer) private renderer: Renderer,fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent  ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        //this.userInfo=userInfo;
        this.details12=[];
        this.data=[];

        this.userdetails=userInfo.getObject('userdetails');
        this.username=this.userdetails.username;
        console.log(this.userdetails.userrole);
        console.log(this.userdetails.id);
        if(this.userdetails.userrole=='affiliate'){
            let idss = {id: this.userdetails.id};
            this.http.post(this.serverUrl + 'editaffiliate', idss)
                .subscribe(data2 => {
                    this.details12 = data2.json()[0];
                //console.log('affiliatedetails')
               // console.log(this.details12)
                    //this.username=this.details12.dealereusername;
                    if(this.userdetails.userrole=='admin'){
                        this.textarealink='http://probidtech.influxiq.com/customersignup'
                    }
                    if(this.userdetails.userrole=='dealer'){
                        this.textarealink='http://'+this.username+'.probidauto.com/#/customersignup';
                    }
                    if(this.userdetails.userrole=='admin'){
                        this.textarealink='http://'+this.userdetails.dealereusername+'.probidauto.com/#/customersignup';
                    }


                }, error => {
                    console.log("Oooops!");
                });
        }
        //console.log();
        let link='';
        if(this.userdetails.userrole=='admin')link = this.serverUrl+'sharemedialist';
        if(this.userdetails.userrole=='dealer' || this.userdetails.userrole=='affiliate')link = this.serverUrl+'sharemedialistdealer';
        this.p=1;
        this.dataarr=[];
        this.orderbyquery='priority';
        this.orderbytype=-1;
        this.http.get(link)
            .subscribe(data1 => {
                this.dataarr = data1.json();

                var x:any;
                for(x in this.dataarr){
                    if(this.userdetails.userrole=='admin'){
                        console.log(this.userdetails.userrole);

                        this.dataarr[x].urllink=this.dataarr[x].url;
                        console.log(this.dataarr[x].urllink);
                    }
                    if(this.userdetails.userrole=='dealer'){
                        console.log(this.userdetails.userrole);
                        this.dataarr[x].urllink='http://'+this.username+'.probidauto.com/#/'+this.dataarr[x].url;
                        console.log(this.dataarr[x].urllink);
                    }
                    if(this.userdetails.userrole=='affiliate'){

                                this.dataarr[x].urllink='http://'+this.userdetails.dealereusername+'.probidauto.com/#/'+this.dataarr[x].url+'/'+this.userdetails.id;


                        console.log(this.userdetails.userrole);

                        console.log(this.dataarr[x].urllink);
                    }
                    this.data.push(this.dataarr[x]);

                }
                console.log('Share media');
                console.log(this.data);
                //<a href="probid.influxiq.com/customersignup"><img src="bannerfilesrc+banner.filename}}" height="{{itembannersize.height}}" width="{{itembannersize.width}}"></a>
              //  console.log(this.data);
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')



                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });
      let  bannerlink = this.serverUrl+'bannerlistactive';
        console.log(bannerlink);
        this.http.get(bannerlink)
            .subscribe(data2 => {
                this.bannerdata = data2.json();

                this.bannerfilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";

               new Clipboard('.clipboardb', {
                    text: function(trigger:any) {
                        return trigger.getAttribute('clipval');
                    }
                });
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
              //  this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });

    }


    deleterow(dealerrow:any){
        //console.log(adminid);

        let link= this.serverUrl+'deletesharemedia';
        let id=dealerrow;
        this.http.post(link,id)
            .subscribe(data1 => {
                // this.data = data1.json();
                //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');
                var index = this.data.indexOf(id.id);
                //let tempdata:Array<any>;
                let x:any;
                for(x in this.data){
                    if(dealerrow._id==this.data[x]._id) {
                        console.log(x+'.......'+this.data.length);
                        delete this.data.x;
                        this.data.splice(x, 1);
                        window.location.reload();
                    }
                }
               // console.log(this.data);
                //this.data=this.tempdata;
                //this.data.splice(index, 1);
                this.appcomponent.putmessages('share media '+dealerrow.name+' deleted successfully','success');
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
       let link= this.serverUrl+'dealerstatuschange';
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
        //console.log(value);
        if(this.orderbyquery==value && this.orderbytype==-1) {
            console.log('caret-up');
            return 'caret-up'
        }

        if(this.orderbyquery==value && this.orderbytype==1) {
           // console.log('caret-up');
            return 'caret-down'
        }
        return 'caret-up-down'
    }
    manageSorting(value:any){
       // console.log(value);
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

    bannerModal(mediaid:any){

        //let shareid=sharemediaid;
       // $('#sharemediaModal').myModal('show');
       // sharemediaModal.open();
      //  $('#sharemediaModal').modal('show');
        //alert(mediaid);
        this.mediaid=mediaid;
console.log(this.mediaid);
        this.renderer.invokeElementMethod(this.allMElementRef.nativeElement, 'click', []);
        //sharemediaModal.open();
        let timeoutId = setTimeout(() => {
            //console.log('hello');
            new Clipboard('.clipboardb', {
                text: function(trigger:any) {
                    return trigger.getAttribute('clipval');
                }
            });

        }, 3000);
    }
    getgrabcode(src:any,imagname:any,imgheight:any,imgwidth:any){
        return '<a href="probid.influxiq.com/customersignup"><img src="'+src+imagname+'" height="'+imgheight+'" width="'+imgwidth+'"></a>';

    }

    getgrab(ev:any){
        console.log('good news');
        var target = ev.target || ev.srcElement || ev.originalTarget;
      var htm=  $(target).parent().prev().text();
        //alert(htm);
        $('#commonclip').attr('clipval',htm);
        $('#commonclip').click();

        $("#grabb").tooltip('show');
        setTimeout(function() {
            $("#grabb").tooltip('hide');
        }, 2000);

    }

  /*  $('.grab').tooltip({
    trigger: 'click',
    placement: 'bottom'
});*/


    tootltrip(){
       // $("#tool").removeClass('hide');
        $("#tool").tooltip('show');
        setTimeout(function() {
            $("#tool").tooltip('hide');
        }, 1000);
    }

}


