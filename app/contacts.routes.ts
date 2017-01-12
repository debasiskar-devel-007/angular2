import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContact }  from './pages/contact/app.contact';
import { AppAbout }  from './pages/about/app.about';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppSignup }  from './pages/signup/app.signup';
import { AppCustomersignup }  from './pages/customersignup/app.customersignup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';

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
import {AppCustomerfooter  }  from './pages/customerfooter/app.customerfooter';
import {AppDealerFaq} from "./pages/dealerfaq/app.faqs";
import {AppDealerlist} from "./pages/dealerlist/app.dealerlist";
import {AppAddsharelink} from "./pages/addsharelink/app.addsharelink";
import {AppAuctioninventoryview} from "./pages/auctioninventoryview/app.auctioninventoryview";
import {AppInventorymatches} from "./pages/inventorymatches/app.inventorymatches";
import {AppPostauctionactivity} from "./pages/postauctionactivity/app.postauctionactivity";
import {AppRecentbidagreement} from "./pages/recentbidagreement/app.recentbidagreement";
import {AppSharemedia} from "./pages/sharemedia/app.sharemedia";
import {AppUpcomingauctions} from "./pages/upcomingauctions/app.upcomingauctions";
import {AppFinance} from "./pages/finance/app.finance";
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
import {AppAddmembershippackage} from "./pages/addmembershippackage/app.addmembershippackage";
import {AppMerbershippackagelist} from "./pages/merbershippackagelist/app.merbershippackagelist";
import {AppEditmembershippackage} from "./pages/editmembershippackage/app.editmembershippackage";
import {AppPackage} from "./pages/package/app.package";
import {AppAuctionlist} from "./pages/auctionlist/app.auctionlist";
import {AppAddauction} from "./pages/addauction/app.addauction";
import {AppEditauction} from "./pages/editauction/app.editauction";
import {AppAddcar} from "./pages/addcar/app.addcar";
import {AppCarlist} from "./pages/carlist/app.carlist";
import {AppEditcar} from "./pages/editcar/app.editcar";
import {AppCustomersignupstep1} from "./pages/customersignupstep1/app.customersignupstep1";
import {AppOrderdetails} from "./pages/orderdetails/app.orderdetails";
import {AppDealerprofile} from "./pages/dealerprofile/app.dealerprofile";
import {AppMembershiporderreport} from "./pages/membershiporderreport/app.membershiporderreport";
import {AppAddpurchasetime} from "./pages/addpurchasetime/app.addpurchasetime";
import {AppPurchasetimelist} from "./pages/purchasetimelist/app.purchasetimelist";
import {AppEditpurchasetime} from "./pages/editpurchasetime/app.editpurchasetime";
import {AppAddbaseprice} from "./pages/addbaseprice/app.addbaseprice";
import {AppBasepricelist} from "./pages/basepricelist/app.basepricelist";
import {AppEditbaseprice} from "./pages/editbaseprice/app.editbaseprice";
import {AppColorlist} from "./pages/colorlist/app.colorlist";
import {AppAddcolor} from "./pages/addcolor/app.addcolor";
import {AppEditcolor} from "./pages/editcolor/app.editcolor";
import {AppAddcarlogo} from "./pages/addcarlogo/app.addcarlogo";
import {AppCarlogolist} from "./pages/carlogolist/app.carlogolist";
import {AppEditcarlogo} from "./pages/editcarlogo/app.editcarlogo";
import {AppAddcarbodystyle} from "./pages/addcarbodystyle/app.addcarbodystyle";
import {AppCarbodystylelist} from "./pages/carbodystylelist/app.carbodystylelist";
import {AppEditcarbodystyle} from "./pages/editcarbodystyle/app.editcarbodystyle";
import {AppAddcarautoyear} from "./pages/addcarautoyear/app.addcarautoyear";
import {AppCarautoyearlist} from "./pages/carautoyearlist/app.carautoyearlist";
import {AppEditcarautoyear} from "./pages/editcarautoyear/app.editcarautoyear";
import {AppDealerauctionlist} from "./pages/dealerauctionlist/app.dealerauctionlist";
import {AppAddcarmileage} from "./pages/addcarmileage/app.addcarmileage";
import {AppCarmileagelist} from "./pages/carmileagelist/app.carmileagelist";
import {AppEditcarmileage} from "./pages/editcarmileage/app.editcarmileage";
import {AppCarfeaturelist} from "./pages/carfeaturelist/app.carfeaturelist";
import {AppAddcarfeature} from "./pages/addcarfeature/app.addcarfeature";
import {AppEditcarfeature} from "./pages/editcarfeature/app.editcarfeature";
import {AppAuctioininventorydetails} from "./pages/auctioininventorydetails/app.auctioininventorydetails";
import {AppAddretailcommission} from "./pages/addretailcommission/app.addretailcommission";
import {AppRetailcommissionlist} from "./pages/retailcommissionlist/app.retailcommissionlist";
import {AppManageopencontract} from "./pages/manageopencontract/app.manageopencontract";
import {AppEditopencontract} from "./pages/editopencontract/app.editopencontract";
import {AppDealercustomerlist} from "./pages/dealercustomerlist/app.dealercustomerlist";
import {AppInventorymatchedetails} from "./pages/inventorymatchedetails/app.inventorymatchedetails";
import {AppDealerpackagepurchase} from "./pages/dealerpackagepurchase/app.dealerpackagepurchase";
import {AppViewbyauctionid} from "./pages/viewbyauctionid/app.viewbyauctionid";
import {AppFreeinvitedealercustomerlist} from "./pages/freeinvitedealercustomerlist/app.freeinvitedealercustomerlist";
import {AppFreecustomercreditcard} from "./pages/freecustomercreditcard/app.freecustomercreditcard";
import {AppFreemembershipviews} from "./pages/freemembershipviews/app.freemembershipviews";
import {AppMailboxsend} from "./pages/mailboxsend/app.mailboxsend";
import {AppEditprefference} from "./pages/editprefference/app.editprefference";
import {AppEditfinance} from "./pages/editfinance/app.editfinance";
import {AppWritemailcustomer} from "./pages/writemailcustomer/app.writemailcustomer";
import {AppAddjobticket} from "./pages/addjobticket/app.addjobticket";
import {AppJobticketsend} from "./pages/jobticketsend/app.jobticketsend";
import {AppJobticketinbox} from "./pages/jobticketinbox/app.jobticketinbox";
import {AppReadjobticket} from "./pages/readjobticket/app.readjobticket";
import {AppCustomeractivitylist} from "./pages/customeractivitylist/app.customeractivitylist";
import {AppAffiliatereport} from "./pages/affiliatereport/app.affiliatereport";
import {AppManagesocialaccounts} from "./pages/managesocialaccounts/app.managesocialaccounts";
import {AppAddopenchannelmanagement} from "./pages/addopenchannelmanagement/app.addopenchannelmanagement";
import {AppOpenchannelmanagementlist} from "./pages/openchannelmanagementlist/app.openchannelmanagementlist";
import {AppEditopenchannelmanagement} from "./pages/editopenchannelmanagement/app.editopenchannelmanagement";
import {AppAddmanageposts} from "./pages/addmanageposts/app.addmanageposts";
import {AppManagepostslist} from "./pages/managepostslist/app.managepostslist";
import {AppEditmanageposts} from "./pages/editmanageposts/app.editmanageposts";
import {AppOngoingauctions} from "./pages/ongoingauctions/app.ongoingauctions";

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
    { path: 'customersignup/:id',component: AppCustomersignup},
    { path: 'customercreditcard',component: AppCustomercreditcard},
    { path: 'adminlogin',component: AppAdminlogin},
    { path: 'customerlogin',component: AppCustomerlogin},
    { path: 'adminheader',component: AppAdminheader,outlet:'adminheader'},
    { path: 'customerheader',component: AppCustomerheader,outlet:'customerheader'},
    { path: 'customerfooter',component: AppCustomerfooter,outlet:'customerfooter'},
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
    { path: 'finance', component:AppFinance},
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
    { path: 'readmessage/:id', component:AppReadmessage},
    { path: 'mailinbox', component:AppMailinbox},
    { path: 'customerprofile/:id', component:AppCustomerprofile},
    { path: 'addaffiliate', component:AppAddaffiliate},
    { path: 'affiliatelist', component:AppAffiliatelist},
    { path: 'editaffiliate/:id', component:AppEditaffiliate},
    { path: 'affiliatelogin', component:AppAffiliatelogin},
    { path: 'affiliateheader', component:AppAffiliateheader,outlet:'affiliateheader'},
    { path: 'affiliatefooter', component:AppAffiliatefooter,outlet:'affiliatefooter'},
    { path: 'affiliatedashboard', component:AppAffiliatedashboard},
    { path: 'auctionbidding/:id', component:AppAuctionbidding},
    { path: 'addmembershippackage', component: AppAddmembershippackage},
    { path: 'merbershippackagelist', component: AppMerbershippackagelist},
    { path: 'editmembershippackage/:id', component: AppEditmembershippackage},
    { path: 'package', component: AppPackage},
    { path: 'auctionlist', component: AppAuctionlist},
    { path: 'addauction', component: AppAddauction},
    { path: 'editauction/:id', component: AppEditauction},
    { path: 'addcar', component: AppAddcar},
    { path: 'carlist', component: AppCarlist},
    { path: 'editcar/:id', component: AppEditcar},
    { path: 'customersignupstep1', component: AppCustomersignupstep1},
    { path: 'orderdetails/:id', component: AppOrderdetails},
    { path: 'dealerprofile', component: AppDealerprofile},
    { path: 'membershiporderreport', component: AppMembershiporderreport},
    { path: 'addpurchasetime', component: AppAddpurchasetime},
    { path: 'purchasetimelist', component: AppPurchasetimelist},
    { path: 'editpurchasetime/:id', component: AppEditpurchasetime},
    { path: 'addbaseprice', component: AppAddbaseprice},
    { path: 'basepricelist', component: AppBasepricelist},
    { path: 'editbaseprice/:id', component: AppEditbaseprice},
    { path: 'colorlist', component: AppColorlist},
    { path: 'addcolor', component: AppAddcolor},
    { path: 'editcolor/:id', component: AppEditcolor},
    { path: 'addcarlogo', component: AppAddcarlogo},
    { path: 'carlogolist', component: AppCarlogolist},
    { path: 'editcarlogo/:id', component: AppEditcarlogo},
    { path: 'addcarbodystyle', component: AppAddcarbodystyle},
    { path: 'carbodystylelist', component: AppCarbodystylelist},
    { path: 'editcarbodystyle/:id', component: AppEditcarbodystyle},
    { path: 'addcarautoyear', component: AppAddcarautoyear},
    { path: 'carautoyearlist', component: AppCarautoyearlist},
    { path: 'editcarautoyear/:id', component: AppEditcarautoyear},
    { path: 'dealerauctionlist', component: AppDealerauctionlist},
    { path: 'addcarmileage', component: AppAddcarmileage},
    { path: 'carmileagelist', component: AppCarmileagelist},
    { path: 'editcarmileage/:id', component: AppEditcarmileage},
    { path: 'carfeaturelist', component: AppCarfeaturelist},
    { path: 'addcarfeature', component: AppAddcarfeature},
    { path: 'editcarfeature/:id', component: AppEditcarfeature},
    { path: 'auctioininventorydetails/:id', component: AppAuctioininventorydetails},
    { path: 'addretailcommission', component: AppAddretailcommission},
    { path: 'retailcommissionlist', component: AppRetailcommissionlist},
    { path: 'manageopencontract', component: AppManageopencontract},
    { path: 'editopencontract/:id', component: AppEditopencontract},
    { path: 'dealercustomerlist', component: AppDealercustomerlist},
    { path: 'inventorymatchedetails/:id', component: AppInventorymatchedetails},
    { path: 'dealerpackagepurchase', component: AppDealerpackagepurchase},
    { path: 'viewbyauctionid/:id', component: AppViewbyauctionid},
    { path: 'freeinvitedealercustomerlist', component: AppFreeinvitedealercustomerlist},
    { path: 'freecustomercreditcard/:randomstring', component: AppFreecustomercreditcard},
    { path: 'freemembershipviews', component: AppFreemembershipviews},
    { path: 'mailboxsend', component: AppMailboxsend},
    { path: 'editprefference', component: AppEditprefference},
    { path: 'editfinance', component: AppEditfinance},
    { path: 'writemailcustomer/:user', component: AppWritemailcustomer},
    { path: 'addjobticket', component: AppAddjobticket},
    { path: 'jobticketsend', component: AppJobticketsend},
    { path: 'jobticketinbox', component: AppJobticketinbox},
    { path: 'readjobticket/:id', component: AppReadjobticket},
    { path: 'customeractivitylist', component: AppCustomeractivitylist},
    { path: 'affiliatereport', component: AppAffiliatereport},
    { path: 'managesocialaccounts', component: AppManagesocialaccounts},
    { path: 'addopenchannelmanagement', component: AppAddopenchannelmanagement},
    { path: 'openchannelmanagementlist', component: AppOpenchannelmanagementlist},
    { path: 'editopenchannelmanagement/:id', component: AppEditopenchannelmanagement},
    { path: 'addmanageposts', component: AppAddmanageposts},
    { path: 'managepostslist', component: AppManagepostslist},
    { path: 'editmanageposts/:id', component: AppEditmanageposts},
    { path: 'ongoingauctions', component: AppOngoingauctions},



];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });