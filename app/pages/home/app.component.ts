import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AppCommonservices} from  '../../services/app.commonservices'
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
    selector: 'my-app',
/*
    template: '<router-outlet></router-outlet>',
*/
    template: '<router-outlet name="dealerheader"><router-outlet name="customerheader">' +
    '</router-outlet><router-outlet name="adminheader"></router-outlet><router-outlet></router-outlet><router-outlet name="dealerfooter"></router-outlet><router-outlet name="adminfooter"><router-outlet name="customerfooter"></router-outlet>',
    providers: [AppCommonservices]
    //templateUrl:'app/pages/home/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
    items:Array<any>;
    loginForm: FormGroup;
    http:any;
    private cookeiservice:CookieService;

    firstName = new FormControl("", Validators.required);

    constructor(fb: FormBuilder ,commonservices: AppCommonservices,http:Http,cookeiservice:CookieService) {

        this.items = commonservices.getItems();
        console.log(this.items);
        console.log(this.items[0].serverUrl);
        this.cookeiservice=cookeiservice;

        let wikiUrl = this.items[0].serverUrl+'listexpert';



        http.get(wikiUrl)
            .subscribe(data => {
                // /this.data1.response = data.json();
                console.log(data);

            }, error => {
                console.log("Oooops!");
            });


        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin() {
        //console.log(this.loginForm.value);
        console.log(99);
        alert(67);
        console.log(this.loginForm.value);
        console.log(this.loginForm.value.email);
    }

    getMessages(){
        let messages: any = this.cookeiservice.getObject('cmessages');
        this.cookeiservice.remove('cmessages');
        if(typeof (messages)!='undefined'){
            if(messages.type=='success')return '<p class="bg-success">'+messages.message+'</p>';
            if(messages.type=='warning')return '<p class="bg-warning">'+messages.message+'</p>';
            if(messages.type=='error')return '<p class="bg-danger">'+messages.message+'</p>';
        }
        return '';
    }
    putmessages(message:string,type:string){
        //let messages:Array<any>;
        console.log(typeof (this.cookeiservice.getObject('cmessages')));
        console.log(this.cookeiservice.getObject('cmessages'));
        if(typeof(this.cookeiservice.getObject('cmessages'))=='undefined') {
            console.log('un');

            let mval = {message: message, type: type};
            let messages: any;
            messages=mval;
            this.cookeiservice.putObject('cmessages',messages);

        }else{
            console.log('yes');
            let messages: any = this.cookeiservice.getObject('cmessages');
            let mval = {message: message, type: type};
            messages[Math.random().toString().replace('.','')+Math.random().toString().replace('.','')]=mval;
            this.cookeiservice.putObject('cmessages',messages);

        }


    }
}

