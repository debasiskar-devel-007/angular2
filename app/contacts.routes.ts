import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContact }  from './pages/contact/app.contact';
import { AppAbout }  from './pages/about/app.about';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppSignup }  from './pages/signup/app.signup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';


const appRoutes: Routes = [
    { path: 'contact', component: AppContact,outlet:'contact' },
    { path: 'about', component: AppAbout  },
    { path: 'home', component: AppHome  },
    {path: 'home',
        component: AppHome,
        outlet:'home'

    },
    { path: 'homecomponent', component: AppHome },
    { path: '', component: AppSignup},
    { path: 'signup', component: AppSignup  },
    { path: 'creditcard', component: AppCreditcard  }
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);