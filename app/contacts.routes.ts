import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContact }  from './pages/contact/app.contact';
import { AppAbout }  from './pages/about/app.about';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppSignup }  from './pages/signup/app.signup';
import { AppCustomersignup }  from './pages/customersignup/app.customersignup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import {AppdealerloginComponents} from "./pages/dealerlogin/app.dealerlogincomponent";
import {AppDealerlogin} from "./pages/dealerlogin/app.dealerlogin";
import {AppDealerheader} from "./pages/dealerheader/app.dealerheader";
import {AppDealerfooter} from "./pages/dealerfooter/app.dealerfooter";
import {AppDealerdashboard} from "./pages/dealerdashboard/app.dealerdashboard";
import {AppAdminlogin} from "./pages/adminlogin/app.adminlogin";
import {AppCustomerlogin} from "./pages/customerlogin/app.customerlogin";
import {AppAdminheader} from "./pages/adminheader/app.adminheader";
import {AppAdminfooter} from "./pages/adminfooter/app.adminfooter";
import {AppAdmindashboard} from "./pages/admindashboard/app.admindashboard";
import {AppAddadmin} from "./pages/addadmin/app.addadmin";
import {AppAddfaq} from "./pages/addfaq/app.addfaq";
import {AppAdminlist} from "./pages/adminlist/app.adminlist";
import {AppFaq} from "./pages/faq/app.faq";
import {AppCustomercreditcard} from "./pages/customercreditcard/app.customercreditcard";
//alert(window.location.hostname);
const checkutl=AppAdminlogin;
//alert(checkutl);

/*if(window.location.hostname=='probidtech.influxiq.com'){
    const checkutl=AppAdminlogin;
}
 if(window.location.hostname=='probiddealer.influxiq.com'){
    const checkutl=AppSignup;
}

 if(window.location.hostname=='probidcustomer.influxiq.com'){
    const checkutl=AppCustomersignup;
}
 if(window.location.hostname=='localhost'){
    const checkutl=AppSignup;
}*/



const appRoutes: Routes = [
   // { path: '/**',component: AppComponent},
    //{ path: '/*',component: AppComponent},
    { path: 'contact', component: AppContact},
    { path: 'about', component: AppAbout },
    { path: '', component: AppAdminlogin  },
    { path: 'signup', component: AppSignup },
    { path: 'creditcard', component: AppCreditcard  },
    { path: 'dealerlogin', component: AppDealerlogin  },
    { path: 'dealerfooter',component:AppDealerfooter,outlet:'dealerfooter'},
    { path: 'dealerheader',component: AppDealerheader,outlet:'dealerheader'},
    { path: 'dealerdashboard',component: AppDealerdashboard},
    { path: 'customersignup',component: AppCustomersignup},
    { path: 'customercreditcard',component: AppCustomercreditcard},

    { path: 'adminlogin',component: AppAdminlogin},
    { path: 'customerlogin',component: AppCustomerlogin},
    { path: 'adminheader',component: AppAdminheader,outlet:'adminheader'},
    { path: 'adminfooter',component: AppAdminfooter,outlet:'adminfooter'},
    { path: 'admindashboard',component: AppAdmindashboard},
    { path: 'addadmin',component: AppAddadmin},
    { path: 'addfaq',component: AppAddfaq},
    { path: 'adminlist',component: AppAdminlist},
    { path: 'faq',component: AppFaq},

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });