import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AppCommonservices} from  '../../services/app.commonservices'
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet><router-outlet name="contact"></router-outlet><router-outlet name="home"></router-outlet>',
    providers: [AppCommonservices]
    //templateUrl:'app/pages/home/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
    items:Array<any>;
    loginForm: FormGroup;
    http:any;

    firstName = new FormControl("", Validators.required);

    constructor(fb: FormBuilder ,commonservices: AppCommonservices,http:Http) {

        this.items = commonservices.getItems();
        console.log(this.items);
        console.log(this.items[0].serverUrl);

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
}

