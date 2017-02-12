import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { AuthService } from './accounts/shared/auth.service'
import { appRoutes } from './routes'
import { AppComponent } from './app.component'
import { AuctionListComponent } from './auctions/auction-list/auction-list.component'
import { AuctionService } from './auctions/shared/auction.service';
import { SupplierService } from './suppliers/shared/supplier.service'
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuctionDetailsComponent } from './auctions/auction-details/auction-details.component'
import { SupplierDetailsComponent } from './suppliers/supplier-details.component'
import { LoginComponent } from './accounts/user/login.component'
import { RegisterComponent } from './accounts/user/register.component'
import { AdminLoginComponent } from './accounts/admin/admin-login.component'
import { AuctionHistoryComponent } from './auctions/auction-history/auction-history.component'
import { AuctionHistoryDetailComponent } from './auctions/auction-history-details/auction-history-details.component'
import { SalesReportComponent } from './reports/sales-report.component'
import { RouteGuard } from './route-guard'

import {enableProdMode} from '@angular/core';
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    AuctionListComponent,
    NavBarComponent,
    AuctionDetailsComponent,
    SupplierDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    AuctionHistoryComponent,
    AuctionHistoryDetailComponent,
    SalesReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [AuctionService, SupplierService, AuthService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
