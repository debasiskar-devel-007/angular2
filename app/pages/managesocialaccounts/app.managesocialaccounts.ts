import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';

declare var $: any;
declare var FB: any;
@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/managesocialaccounts/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppManagesocialaccounts {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private router: Router;
    loginerror:any;
    userDetails:any;
    uploadedfilesrc:any;
    coockieData:CookieService;
    private customerlist: any;
    private dealerlist: any;
    private messageaar: Array<any>;
    private messageaarpub:any;
    private breaklog1:any;
    private breaklog:any;
    datamsg:any;
    accesstokenarr:any;
    details2:any;
    facebookprofileid:any;
    facebookinfo:any;
    facebookname:any;
    facebookemail:any;
    openchannellist:any;
    user:any;
    twitter_auth_token:any;

    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userdetails:CookieService,router: Router  ) {
       // this.uploadedfilesrc='';
        this.items = commonservices.getItems();
        this.http=http;
        this.serverUrl = this.items[0].serverUrl;
        this.coockieData=userdetails;
        this.userDetails=userdetails.getObject('userdetails');
        this.user=this.userDetails.username;
        console.log('login user info');
        console.log(this.userDetails);
        this.router=router;
        this.messageaar=[];
        this.messageaarpub=[];
        this.dealerlist=[];
        this.breaklog1=0;
        this.facebookprofileid=0;
        this.breaklog=0;
        this.twitter_auth_token=0;
        this.customerlist=[];
        this.details2=[];
        this.facebookinfo=[];
        this.openchannellist=[];
        /*setTimeout(function() {
            FB.api('/me', function(response:any) {
                if(response.data) {
                    $.each(response.data,function(index:any,info:any) {
                        console.log(info);
                       // alert(friend.name + ' has id:' + friend.id);
                    });
                } else {
                    alert("Error!");
                }
            });
        }, 1000);*/


        let ids = {username: this.userDetails.username};
        this.http.post(this.serverUrl + 'editdealerbyusername', ids)
            .subscribe(data => {
                this.details2 = data.json()[0];
                var twiturl='http://probiddealer.influxiq.com/twitter/userinformation.php?twitter_auth_token='+this.details2.twitter_auth_token+'&twitter_auth_token_secret='+this.details2.twitter_auth_token_secret;
                console.log('twitter link');
                console.log(twiturl);
                $.ajax({url:  twiturl, success: function(results41:any){
                    console.log('Twitter Data');
                   // console.log((results41));
                    var twitterinfo=$.parseJSON(results41);
                    console.log(twitterinfo);
                   // console.log($.parseJSON(JSON.stringify(results41)));
                    $('.twitterscrrename').html('@'+twitterinfo.screen_name);
                    $('.twitterimage').attr('src',twitterinfo.profile_image_url_https);
                    $('.twitterlocation').html(twitterinfo.location);
                    $('.twitterdescription').html(twitterinfo.description);

                }});

                var access=this.details2.fb_exchange_token;

                console.log(this.details2.fb_exchange_token);
              var  url3='https://graph.facebook.com/me?fields=id,name,email,about&limit=100&access_token='+access;
                console.log(url3);
                setTimeout(function() {
                $.ajax({url:  url3, success: function(results4:any){
                    console.log('Facebook Data');
                    console.log('the ');
                    console.log(results4);
                    console.log(this.facebookemail);
                    $('.facebookname').html(results4.name);
                    $('.facebookemail').html(results4.email);
                    $('.facebookimage').attr('src','https://graph.facebook.com/'+results4.id+'/picture?type=large');


                }});
                }, 1000);
                if(typeof(this.details2.facebookprofileid)!='undefined')
                this.facebookprofileid=this.details2.facebookprofileid;
                else this.facebookprofileid=0;
                if(typeof(this.details2.twitter_auth_token)!='undefined')
                this.twitter_auth_token=this.details2.twitter_auth_token;
                else this.twitter_auth_token=0;
                //this.twitter_auth_token=this.details2.twitter_auth_token;
                 console.log(this.details2);
                // console.log(this.details1.filename);
                console.log('Facebook id');
                console.log(this.facebookprofileid);
                // }

            }, error => {
                console.log("Oooops!");
            });

        let linkmessage = this.serverUrl+'messagelist';
        this.http.get(linkmessage)
            .subscribe(data1 => {
                this.datamsg = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
               // this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                /*               console.log(' message list ...');
                 console.log(this.data);
                 console.log(this.data.length);*/
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        console.log('User Info');
       // images/img_customersignup_car.png
        console.log(this.userDetails.filename);
        this.uploadedfilesrc= 'images/logo_61.png';
        if(this.userDetails.filename!='undefined'){
            this.uploadedfilesrc = "http://probidbackend.influxiq.com/uploadedfiles/sharelinks/" + this.userDetails.filename;
        }
        else{
            this.uploadedfilesrc= 'images/logo_61.png';
        }


        let linkcustomer = this.serverUrl+'customerlist';
        // console.log(link);
        this.http.get(linkcustomer)
            .subscribe(data1 => {
                this.customerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                //this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                //console.log(' customer list ...');
                // console.log(this.customerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        let linkdealer = this.serverUrl+'dealerlist';
        // console.log(link);
        this.http.get(linkdealer)
            .subscribe(data1 => {
                this.dealerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        let link2 = this.serverUrl+'openchannelmanagementlist';

        let ids12={dealereusername:this.userDetails.username};
        this.http.post(link2,ids12)
            .subscribe(data1 => {
                this.openchannellist = data1.json();
                console.log('channel data');
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                console.log(this.openchannellist);
                console.log(ids12);


            }, error => {
                console.log("Oooops!");
            });

    }
    private makemessagelist() {
        // if(this.dealerlist.length>0 && this.customerlist.length>0) {
        this.messageaar = [];
        this.messageaarpub=[];
        var x: any;
        for (x in this.datamsg) {
            if(this.datamsg[x].parentid!=0) this.datamsg[x]._id=this.datamsg[x].parentid;
            if (this.datamsg[x].to == this.userDetails.username) {
                this.datamsg[x].fromfullname = this.getuserinfo(this.datamsg[x].from);
                this.messageaar[this.datamsg[x]._id]=(this.datamsg[x]);
            }
        }

        for ( var key in this.messageaar ){
            this.messageaarpub.push(this.messageaar[key]);
        }
        console.log('message length');
        console.log(this.messageaarpub.length);
    }
    private getuserinfo(from:any) {
        var y:any;
        for(y in this.customerlist){
            this.breaklog++;

            if(from==this.customerlist[y].username){
                return this.customerlist[y].fname+' '+this.customerlist[y].lname+' ( '+this.customerlist[y].username+' ) ';
            }

        }
        var z:any;
        for(z in this.dealerlist){
            this.breaklog1++;

            if(from==this.dealerlist[z].username){
                return this.dealerlist[z].fname+' '+this.dealerlist[z].lname+' ( '+this.dealerlist[z].username+' ) ';
            }

        }

        return '';

    }
   /* private updatedealerwithfbinfo(previousaccesstoken:any,profileid:any){
        this.http.get('https://graph.facebook.com/oauth/access_token?client_id=310938685967600&client_secret=7a1d6091509dcc9ecd81a468d3d49226&grant_type=fb_exchange_token&fb_exchange_token='+previousaccesstoken)
            .subscribe(data => {
                this.accesstokenarr=data.json();

                console.log(this.accesstokenarr);

            }, error => {
                console.log("Oooops!");
            });

    }*/
    connectfacebook(){
        //alert(6);
        var username=this.userDetails.username;
        var url=this.serverUrl;
        //console.log(username);
        FB.getLoginStatus(function(response:any) {
            if (response.status === 'connected') {
                //console.log('Logged in.');
               // console.log(response.authResponse);
               // console.log(response.authResponse.accessToken);
                //FB.api('/me/feed', 'post', {message: 'Hello, world!'});
               // var profileid=updatedealerwithfbinfo(response.authResponse.userID,response.authResponse.accessToken);

                $.ajax({url: 'https://graph.facebook.com/oauth/access_token?client_id=310938685967600&client_secret=7a1d6091509dcc9ecd81a468d3d49226&grant_type=fb_exchange_token&fb_exchange_token='+response.authResponse.accessToken, success: function(result:any){
                    //console.log(result);
                    var result = result.split('&');
                    var token=( result[0].replace('access_token=','') );
                    var userid=response.authResponse.userID;

                    //console.log(userid);
                   // console.log(token);
                    $.ajax({url: url+'updatedealerfacebookinfo?username='+username+'&facebookprofileid='+userid+'&fb_exchange_token='+token, success: function(results11:any){
                        console.log(results11);
                        var access1=token;
                        console.log(token);
                        var  url31='https://graph.facebook.com/me?fields=id,name,email,about&limit=100&access_token='+access1;
                       // console.log(url31);
                        setTimeout(function() {
                            $.ajax({url:  url31, success: function(results41:any){
                                //console.log('Facebook Data');
                               // console.log('the ');
                               // console.log(results41);
                               // console.log(this.facebookemail);
                                $('.facebookname').html(results41.name);
                                $('.facebookemail').html(results41.email);
                                $('.facebookimage').attr('src','https://graph.facebook.com/'+results41.id+'/picture?type=large');


                            }});
                        }, 1000);


                    }});



                }});



            }
            else {
                //alert(7);
                //FB.login();
                FB.login(function(responses:any) {
                    // handle the response
                }, {scope: 'email'});
            }
        });
    }

}


