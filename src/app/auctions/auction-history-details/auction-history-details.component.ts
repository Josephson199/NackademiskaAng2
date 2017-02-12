import { Component } from '@angular/core'
import { Auction } from '../shared/auction-model'
import { AuctionService } from '../shared/auction.service'
import { Supplier } from '../../suppliers/shared/supplier-model'
import { SupplierService } from '../../suppliers/shared/supplier.service'
import { ActivatedRoute, Params } from '@angular/router'
import { Bid } from '../shared/bid-model'
import { Location } from '@angular/common'

import { Router } from '@angular/router'

@Component({
    templateUrl: './auction-history-details.component.html',
    styles: [`
    #header{
         margin-top: 40px;
    }
    `]
})
export class AuctionHistoryDetailComponent {

    currentAuctionId: number
    auction: Auction
    auctionBidHistory: Bid[]
    highestBid: number
    supplier: Supplier
    provision: number

    constructor(private activeRoute: ActivatedRoute, private auctionService: AuctionService, private supplierService: SupplierService, 
                private location: Location) { }



    ngOnInit() {
        this.currentAuctionId = this.activeRoute.snapshot.params['id']

        this.auctionService.getAuction(this.currentAuctionId).then(res => {
            this.auction = res
            this.supplierService.getSupplier(res.supplierId).then(sup => {

                this.auctionService.getAuctionBidHistory(this.currentAuctionId).then(bids => {
                    let highest = Math.max.apply(Math, bids.map(function (o) { return o.bidPrice; }))

                    
                    this.provision = highest * sup.commission
                    this.supplier = sup
                })
            })
        })
    }



  cancel() {
    this.location.back()
  }



}







