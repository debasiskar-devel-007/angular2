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
import {DomSanitizer} from "@angular/platform-browser";
import {AppComponent} from "../home/app.component";


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/dealerauctionlist/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerauctionlist{
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
    carimgsrc:any;
    //sharemediaModal:any;
    @ViewChild('all_m')
    private allMElementRef:any;
    private mediaid:any;
    private auctiocardata:any;
    carlogolist:any;
    carautoyearlist:any;
    carmileagelist:any;
    colorlist:any;
    carid:any;
    carname:any;
    private dealerauctiondata:any;


    constructor(@Inject(Renderer) private renderer: Renderer,fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,appcomponent:AppComponent,private _sanitizer: DomSanitizer   ) {
        this.router=router;
        this.http=http;
        this.router=router;
        this.appcomponent=appcomponent;
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.messages = appcomponent.getMessages();
        this.serverUrl = this.items[0].serverUrl;
        //this.userInfo=userInfo;

        this.userdetails=userInfo.getObject('userdetails');
        console.log(this.userdetails.id);
        let link='';
        link = this.serverUrl+'dealerauctionlist';
        this.p=1;
        this.orderbyquery='priority';
        this.orderbytype=-1;


        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
              //  console.log(this.data);
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });
      let  bannerlink = this.serverUrl+'bannerlistactive';
       // console.log(bannerlink);
        this.http.get(bannerlink)
            .subscribe(data2 => {
                this.bannerdata = data2.json();

                this.bannerfilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
              //  this.pagec=Math.ceil(this.data.length / 10);

            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);
                this.carlogolist=data.json();

                console.log(this.carlogolist);


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

        let val11={dealerid:this.userdetails.id};
        let link2= this.serverUrl+'getinventorybydealer';
        this.http.post(link2,val11)
            .subscribe(data2 => {
                 this.dealerauctiondata = data2.json();
                console.log(this.dealerauctiondata);
                console.log('dealer auction data');

            }, error => {
                console.log("Oooops!");
            });


    }

    checkauctionval(val:any){
        console.log('auction val ...');
        console.log(val);
        var x:any;
        for(x in this.dealerauctiondata){

            console.log(this.dealerauctiondata[x].auctionid+'777');
            if(this.dealerauctiondata[x].auctionid==val) return true;
        }
        return false;
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

    dealerauctionModal(auctiocardata:any){
        //let shareid=sharemediaid;
       // $('#sharemediaModal').myModal('show');
       // sharemediaModal.open();
      //  $('#sharemediaModal').modal('show');
        //alert(mediaid);
        this.auctiocardata=auctiocardata;
        this.carimgsrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
        this.renderer.invokeElementMethod(this.allMElementRef.nativeElement, 'click', []);
        //sharemediaModal.open();
    }

    addInventory(data1:any){
        let auctionid=data1.auctionid;
        let val={auctionid:auctionid,dealerid:this.userdetails.id};
        console.log(val);
        let link1= this.serverUrl+'addinventory';
         this.http.post(link1,val)
         .subscribe(data1 => {
         // this.data = data1.json();
         //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');

         //console.log(this.data);
           //  dealerauctioninventory
         }, error => {
         console.log("Oooops!");
         });
    }

    getcarlogo(val:any){
        console.log('get car logo ...');
        console.log(val);
        //carlogolist
        var x:any;
        for(x in this.carlogolist){
            if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
        }
        return 'N/A';
    }
    getcaryear(val:any){
        console.log(val);
        //carlogolist
        var y:any;
        for(y in this.carautoyearlist){
            if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;
        }
        return 'N/A';
    }
    getmileage(val:any){
        console.log(val);
        //carlogolist
        var z:any;
        for(z in this.carmileagelist){
            if(this.carmileagelist[z]._id==val.mileage) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }
    getcolor(val:any){
        console.log(val);
        //carlogolist
        var a:any;
        for(a in this.colorlist){
            if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
        }
        return 'N/A';
    }

    deleteFromInventory(data1:any){
        let auctionid=data1.auctionid;
        let val={auctionid:auctionid,dealerid:this.userdetails.id};
        console.log(val);
        console.log('in delete method !!!');
        let link1= this.serverUrl+'deleteFromInventory';
         this.http.post(link1,val)
         .subscribe(data1 => {
         // this.data = data1.json();
         //  this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)');

         //console.log(this.data);
           //  dealerauctioninventory
         }, error => {
         console.log("Oooops!");
         });

        let val11={dealerid:this.userdetails.id};
        let link2= this.serverUrl+'getinventorybydealer';
        this.http.post(link2,val11)
            .subscribe(data2 => {
                this.dealerauctiondata = data2.json();
                console.log(this.dealerauctiondata);
                console.log('dealer auction data');

            }, error => {
                console.log("Oooops!");
            });
    }



}


