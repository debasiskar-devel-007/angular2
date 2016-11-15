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
import {AppCustomerdashboard} from "./pages/customerdashboard/app.customerdashboard";
import {AppAddadmin} from "./pages/addadmin/app.addadmin";
import {AppEditadmin} from "./pages/editadmin/app.editadmin";
import {AppAddfaq} from "./pages/addfaq/app.addfaq";
import {AppAddFaqByAdmin} from "./pages/addfaqbyadmin/app.addfaqbyadmin";
import {AppEditFaqbyAdmin} from "./pages/editfaqbyadmin/app.editfaqbyadmin";
import {AppAdminlist} from "./pages/adminlist/app.adminlist";
import {AppFaq} from "./pages/faq/app.faq";
//import {AppDealerFaq} from "./pages//app.faqs";
import {AppDealerWebsiteLogin} from "./pages/dealerwebsitelogin/dealerwebsitelogin";
import {AppCustomercreditcard} from "./pages/customercreditcard/app.customercreditcard";
import {AppCustomerheader  }  from './pages/customerheader/app.customerheader';
import {AppDealerFaq} from "./pages/dealerfaq/app.faqs";
import {AppDealerlist} from "./pages/dealerlist/app.dealerlist";
import {AppAddsharelink} from "./pages/addsharelink/app.addsharelink";
import {AppAuctioninventoryview} from "./pages/auctioninventoryview/app.auctioninventoryview";
import {AppInventorymatches} from "./pages/inventorymatches/app.inventorymatches";
import {AppPostauctionactivity} from "./pages/postauctionactivity/app.postauctionactivity";
import {AppRecentbidagreement} from "./pages/recentbidagreement/app.recentbidagreement";
import {AppSharemedia} from "./pages/sharemedia/app.sharemedia";
import {AppUpcomingauctions} from "./pages/upcomingauctions/app.upcomingauctions";
import {AppAppFinance} from "./pages/finance/app.finance";
import {AppRetailcustomerconnect} from "./pages/retailcustomerconnect/app.retailcustomerconnect";
import {AppEditsharelink} from "./pages/editsharelink/app.editsharelink";
import {AppBannersizelist} from "./pages/bannersizelist/app.bannersizelist";
import {AppAddbannersize} from "./pages/addbannersize/app.addbannersize";
import {AppEditbannersize} from "./pages/editbannersize/app.editbannersize";
import {AppAddbanner} from "./pages/addbanner/app.addbanner";
import {AppBannerlist} from "./pages/bannerlist/app.bannerlist";
import {AppEditbanner} from "./pages/editbanner/app.editbanner";
import {AppViewcustomers} from "./pages/viewcustomers/app.viewcustomers";
import {AppViewrsvp} from "./pages/viewrsvp/app.viewrsvp";
import {AppWritemail} from "./pages/writemail/app.writemail";
import {AppReadmessage} from "./pages/readmessage/app.readmessage";
import {AppMailinbox} from "./pages/mailinbox/app.mailinbox";
import {AppCustomerprofile} from "./pages/customerprofile/app.customerprofile";
import {AppAddaffiliate} from "./pages/addaffiliate/app.addaffiliate";
import {AppAffiliatelist} from "./pages/affiliatelist/app.affiliatelist";
import {AppEditaffiliate} from "./pages/editaffiliate/app.editaffiliate";
import {AppAffiliatelogin} from "./pages/affiliatelogin/app.affiliatelogin";
import {AppAffiliateheader} from "./pages/affiliateheader/app.affiliateheader";
import {AppAffiliatefooter} from "./pages/affiliatefooter/app.affiliatefooter";
import {AppAffiliatedashboard} from "./pages/affiliatedashboard/app.affiliatedashboard";
import {AppAuctionbidding} from "./pages/auctionbidding/app.auctionbidding";
//alert(window.location.hostname);

//alert(checkutl);
var checkutl:any='';
if(window.location.hostname=='probidtech.influxiq.com'){
     checkutl=AppAdminlogin;
}


 if(window.location.hostname=='probidcustomer.influxiq.com'){
     checkutl=AppCustomerlogin;
}
 if(window.location.hostname=='localhost'){
     checkutl=AppSignup;
}

if(window.location.hostname=='probiddealer.influxiq.com'){
     //alert(7);
     checkutl=AppDealerWebsiteLogin;
}
if(checkutl=='')  checkutl=AppDealerlogin;
//alert(checkutl);
//alert(5);


const appRoutes: Routes = [
   // { path: '/**',component: AppComponent},
    //{ path: '/*',component: AppComponent},
    { path: 'contact', component: AppContact},
    { path: 'about', component: AppAbout },
    { path: '', component: checkutl  },
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
    { path: 'customerheader',component: AppCustomerheader,outlet:'customerheader'},
    { path: 'adminfooter',component: AppAdminfooter,outlet:'adminfooter'},
    { path: 'admindashboard',component: AppAdmindashboard},
    { path: 'customerdashboard',component: AppCustomerdashboard},
    { path: 'addadmin',component: AppAddadmin},
    { path: 'addfaq',component: AppAddfaq},
    { path: 'addfaqbyadmin',component: AppAddFaqByAdmin},
    { path: 'adminlist',component: AppAdminlist},
    { path: 'dealerlist',component: AppDealerlist},
    { path: 'faq',component: AppFaq},
    { path: 'dealerfaq',component: AppDealerFaq},
    { path: 'dealerwebsitelogin',component: AppDealerWebsiteLogin},
    { path: 'dealerautologin/:id',component: AppDealerWebsiteLogin},
    { path: 'editadmin/:id', component: AppEditadmin },
    { path: 'editfaq/:id', component: AppEditFaqbyAdmin },
    { path: 'addsharelink', component:AppAddsharelink},
    { path: 'editsharelink/:id', component: AppEditsharelink },
    { path: 'auctioninventoryview', component:AppAuctioninventoryview},
    { path: 'inventorymatches', component:AppInventorymatches},
    { path: 'postauctionactivity', component:AppPostauctionactivity},
    { path: 'recentbidagreement', component:AppRecentbidagreement},
    { path: 'sharemedia', component:AppSharemedia},
    { path: 'upcomingauctions', component:AppUpcomingauctions},
    { path: 'finance', component:AppAppFinance},
    { path: 'retailcustomerconnect', component:AppRetailcustomerconnect},
    { path: 'bannersizelist', component:AppBannersizelist},
    { path: 'addbannersize', component:AppAddbannersize},
    { path: 'editbannersize/:id', component: AppEditbannersize },
    { path: 'addbanner', component:AppAddbanner},
    { path: 'bannerlist', component:AppBannerlist},
    { path: 'editbanner/:id', component:AppEditbanner},
    { path: 'viewcustomers', component:AppViewcustomers},
    { path: 'viewrsvp', component:AppViewrsvp},
    { path: 'writemail', component:AppWritemail},
    { path: 'readmessage', component:AppReadmessage},
    { path: 'mailinbox', component:AppMailinbox},
    { path: 'customerprofile', component:AppCustomerprofile},
    { path: 'addaffiliate', component:AppAddaffiliate},
    { path: 'affiliatelist', component:AppAffiliatelist},
    { path: 'editaffiliate/:id', component:AppEditaffiliate},
    { path: 'affiliatelogin', component:AppAffiliatelogin},
    { path: 'affiliateheader', component:AppAffiliateheader,outlet:'affiliateheader'},
    { path: 'affiliatefooter', component:AppAffiliatefooter,outlet:'affiliatefooter'},
    { path: 'affiliatedashboard', component:AppAffiliatedashboard},
    { path: 'auctionbidding', component:AppAuctionbidding},


];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });