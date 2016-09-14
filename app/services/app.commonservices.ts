import { Component } from '@angular/core';


export class AppCommonservices {
    items:Array<any>;

    constructor() {
        this.items = [
            { serverUrl: 'http://localhost:8001/' },
            { name: 'Pascal Precht' },
            { n2: 'thoughtram' }
        ];
    }

    getItems() {
        return this.items;
    }


}

