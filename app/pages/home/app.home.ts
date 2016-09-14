import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-app',
    //template: '<h1>Component Router</h1> <nav> <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a> <a routerLink="/heroes" routerLinkActive="active">Heroes</a> </nav> <router-outlet></router-outlet>'
    templateUrl:'app/pages/home/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppHome {
    loginForm: FormGroup;

    firstName = new FormControl("", Validators.required);

    constructor(fb: FormBuilder) {
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

