import {NgModule, Provider}      from '@angular/core';
import {routing, appRoutingProviders} from './contacts.routes';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }  from './pages/home/app.component';
import { AppHome }  from './pages/home/app.home';
import { AppAbout }  from './pages/about/app.about';
import { AppSignup }  from './pages/signup/app.signup';
import { AppSignupComponents }  from './pages/signup/app.signupcomponent';
import { AppCustomersignup }  from './pages/customersignup/app.customersignup';
import { AppCreditcard }  from './pages/creditcard/app.creditcard';
import { HttpModule, JsonpModule } from '@angular/http';
import {PopoverModule} from "ng2-popover";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs/Observable';
import {AppCommonservices} from  './services/app.commonservices';
import {searchPipe} from  './services/search.pipe';
import {OrderBy} from  './services/orderby';

import { AppContact }  from './pages/contact/app.contact';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ng2-modal";

import {AppDealerlogin} from "./pages/dealerlogin/app.dealerlogin";
import {AppDealerheader} from "./pages/dealerheader/app.dealerheader";
import {AppDealerfooter} from "./pages/dealerfooter/app.dealerfooter";
import {AppDealerdashboard} from "./pages/dealerdashboard/app.dealerdashboard";
import {AppAdminlogin} from "./pages/adminlogin/app.adminlogin";
import { AppadminloginComponents }  from './pages/adminlogin/app.adminlogincomponent';
import {AppCustomerlogin} from "./pages/customerlogin/app.customerlogin";
import { AppcustomerloginComponents }  from './pages/customerlogin/app.customerlogincomponent';
import { AppAdminheader }  from './pages/adminheader/app.adminheader';
import {AppCustomerheader  }  from './pages/customerheader/app.customerheader';
import {AppCustomerfooter  }  from './pages/customerfooter/app.customerfooter';
import { AppAdminfooter }  from './pages/adminfooter/app.adminfooter';
import { AppAdmindashboard }  from './pages/admindashboard/app.admindashboard';
import { AppCustomerdashboard }  from './pages/customerdashboard/app.customerdashboard';
import { AppAddadmin }  from './pages/addadmin/app.addadmin';
import { AppEditadmin }  from './pages/editadmin/app.editadmin';
import { AppAddfaq }  from './pages/addfaq/app.addfaq';
import { AppEditFaqbyAdmin }  from './pages/editfaqbyadmin/app.editfaqbyadmin';
import { AppAddFaqByAdmin }  from './pages/addfaqbyadmin/app.addfaqbyadmin';
import { AppAdminlist }  from './pages/adminlist/app.adminlist';
import { AppFaq }  from './pages/faq/app.faq';
import { AppDealerFaq }  from './pages/dealerfaq/app.faqs';
import { AppCustomercreditcard }  from './pages/customercreditcard/app.customercreditcard';
import {Ng2PaginationModule} from 'ng2-pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import {AppDealerWebsiteLogin} from "./pages/dealerwebsitelogin/dealerwebsitelogin";
import {AppDealerlist} from "./pages/dealerlist/app.dealerlist";
import {AppAddsharelink} from "./pages/addsharelink/app.addsharelink";
import { AppEditsharelink }  from './pages/editsharelink/app.editsharelink';
import {AppAuctioninventoryview} from "./pages/auctioninventoryview/app.auctioninventoryview";
import {AppInventorymatches} from "./pages/inventorymatches/app.inventorymatches";
import {AppPostauctionactivity} from "./pages/postauctionactivity/app.postauctionactivity";
import {AppRecentbidagreement} from "./pages/recentbidagreement/app.recentbidagreement";
import {AppSharemedia} from "./pages/sharemedia/app.sharemedia";
import {AppUpcomingauctions} from "./pages/upcomingauctions/app.upcomingauctions";
import {AppFinance} from "./pages/finance/app.finance";
import {AppRetailcustomerconnect} from "./pages/retailcustomerconnect/app.retailcustomerconnect";
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
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
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
//import {Clipboard} from 'clipboard';




@NgModule({
  imports: [ BrowserModule,FormsModule ,ReactiveFormsModule ,routing, HttpModule,
    JsonpModule,ModalModule,PopoverModule,Ng2PaginationModule,CKEditorModule],
  declarations: [ AppComponent ,AppAdminheader,AppAdminfooter,AppAdmindashboard,AppAdminlist,AppAddadmin,AppContact,AppAbout ,AppHome,AppSignup,AppSignupComponents,AppCreditcard,AppDealerlogin,AppDealerheader,AppDealerfooter,AppDealerdashboard,AppCustomersignup,AppCustomercreditcard,AppAdminlogin,AppadminloginComponents,AppCustomerlogin,AppcustomerloginComponents,AppAddfaq,AppFaq,AppEditadmin,searchPipe,OrderBy,AppAddFaqByAdmin,AppEditFaqbyAdmin,AppDealerFaq,AppCustomerheader,AppCustomerfooter,AppCustomerdashboard,AppDealerWebsiteLogin,AppDealerlist,AppAddsharelink,AppAuctioninventoryview,AppInventorymatches,AppPostauctionactivity,AppRecentbidagreement,AppSharemedia,AppEditsharelink,AppUpcomingauctions,AppFinance,AppRetailcustomerconnect,AppBannersizelist,AppAddbannersize,AppEditbannersize,AppAddbanner,AppBannerlist,AppEditbanner,AppViewcustomers,AppViewrsvp,AppWritemail,AppReadmessage,AppMailinbox,AppCustomerprofile,AppAddaffiliate,AppAffiliatelist,AppEditaffiliate,AppAffiliatelogin,AppAffiliatefooter,AppAffiliateheader,AppAffiliatedashboard,AppAddmembershippackage,AppMerbershippackagelist,AppAuctionbidding,AppEditmembershippackage,AppPackage,AppAuctionlist,AppAddauction,AppEditauction,AppAddcar,AppCarlist,AppEditcar,AppCustomersignupstep1,AppOrderdetails,AppDealerprofile,AppMembershiporderreport,AppAddpurchasetime,AppPurchasetimelist,AppEditpurchasetime,AppAddbaseprice,AppBasepricelist,AppEditbaseprice,AppColorlist,AppAddcolor,AppEditcolor,AppCarlogolist,AppAddcarlogo,AppEditcarlogo,AppAddcarbodystyle,AppCarbodystylelist,AppEditcarbodystyle,AppAddcarautoyear,AppCarautoyearlist,AppEditcarautoyear,AppDealerauctionlist,AppAddcarmileage,AppCarmileagelist,AppEditcarmileage,AppCarfeaturelist,AppAddcarfeature,AppEditcarfeature,AppAuctioininventorydetails,AppAddretailcommission,AppRetailcommissionlist,AppManageopencontract,AppEditopencontract,AppDealercustomerlist,AppInventorymatchedetails,AppDealerpackagepurchase,UPLOAD_DIRECTIVES],
  providers: [
    appRoutingProviders,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
