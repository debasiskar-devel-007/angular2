import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";


@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/signup/home.html',
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppSignup {
    // /@ViewChild(Modal) modal;
    signupform: FormGroup;
    myModal :ModalModule;

    firstName = new FormControl("", Validators.required);
    private router: Router;

    constructor(fb: FormBuilder  ) {

        this.signupform = fb.group({
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", Validators.required],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            term: ["", Validators.required]
        });

        //this.router.navigate(['/about']);
    }

    dosubmit() {
        //console.log(this.loginForm.value);
        console.log(99);
        alert(67);
        console.log(this.signupform.value);
        console.log(this.signupform.value.email);
    }

    opentermsandconditions(){
        //$('#termsandcondition').modal('show');
        //secondModal.open();
        //this.myModal.open();

        $('#termsmodal').click();



    }
}


