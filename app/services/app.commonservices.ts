import { Component } from '@angular/core';
import {Headers,Http} from "@angular/http";


export class AppCommonservices {
    items:Array<any>;
    http:Http;

    constructor(http:Http) {
        this.http=http;
        this.items = [
            { serverUrl: 'http://localhost:8001/' },
            { name: 'Pascal Precht' },
            { n2: 'thoughtram' }
        ];
    }

    getItems() {
        return this.items;
    }


    getusastates(){

        this.http.get(this.items+'getusastates')
            .subscribe(data => {
                console.log(data);
                return data;


            }, error => {
                console.log("Oooops!");
            });

}


}

