import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContact }  from './pages/contact/app.contact';
import { AppAbout }  from './pages/about/app.about';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';


const appRoutes: Routes = [
    { path: 'contact', component: AppContact },
    { path: 'about', component: AppAbout },
    { path: '', component: AppHome  }
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);