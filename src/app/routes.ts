import { Routes } from '@angular/router'

import { AuctionDetailsComponent } from './auctions/auction-details/auction-details.component'
import { AuctionListComponent } from './auctions/auction-list/auction-list.component'
import { SupplierDetailsComponent } from './suppliers/supplier-details.component'
import { LoginComponent } from './accounts/user/login.component'
import { RegisterComponent } from './accounts/user/register.component'
import { AdminLoginComponent } from './accounts/admin/admin-login.component'
import { AuctionHistoryComponent } from './auctions/auction-history/auction-history.component'
import { AuctionHistoryDetailComponent } from './auctions/auction-history-details/auction-history-details.component'
import { SalesReportComponent } from './reports/sales-report.component'
import { RouteGuard } from './route-guard'
import { Error404Component } from './error/404.component'

export const appRoutes:Routes = [
    { path: 'auctions', component: AuctionListComponent },
    { path: 'auction/:id', component: AuctionDetailsComponent },
    { path: 'supplier/:id', component: SupplierDetailsComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/register', component: RegisterComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/auctionhistory', component: AuctionHistoryComponent, canActivate: [RouteGuard] },
    { path: 'admin/auctionhistorydetail/:id', component: AuctionHistoryDetailComponent, canActivate: [RouteGuard] },
    { path: 'admin/salesreport', component:  SalesReportComponent, canActivate: [RouteGuard] },
    { path: '404', component: Error404Component },
    { path: '**', component: Error404Component },
    { path: '', redirectTo: 'auctions', pathMatch: 'full'}
]