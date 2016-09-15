import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>'
    //templateUrl:'app/pages/contact/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppSignupComponents {
    loginForm: FormGroup;

    firstName = new FormControl("", Validators.required);
    private router: Router;

    constructor(fb: FormBuilder) {

        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });

        this.router.navigate(['/about']);
    }

    doLogin() {
        //console.log(this.loginForm.value);
        console.log(99);
        alert(67);
        console.log(this.loginForm.value);
        console.log(this.loginForm.value.email);
    }
}


