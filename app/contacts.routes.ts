import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContact }  from './pages/contact/app.contact';
import { AppAbout }  from './pages/about/app.about';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppSignup }  from './pages/signup/app.signup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import {AppdealerloginComponents} from "./pages/dealerlogin/app.dealerlogincomponent";
import {AppDealerlogin} from "./pages/dealerlogin/app.dealerlogin";


const appRoutes: Routes = [
    { path: 'contact', component: AppContact },
    { path: 'about', component: AppAbout },
    { path: '', component: AppSignup  },
    { path: 'signup', component: AppSignup  },
    { path: 'creditcard', component: AppCreditcard  },
    { path: 'dealerlogin', component: AppDealerlogin  }
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);