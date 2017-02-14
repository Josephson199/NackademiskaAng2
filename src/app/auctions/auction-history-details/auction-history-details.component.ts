import { Component, OnInit } from '@angular/core'
import { Auction } from '../shared/auction-model'
import { AuctionService } from '../shared/auction.service'
import { Supplier } from '../../suppliers/shared/supplier-model'
import { SupplierService } from '../../suppliers/shared/supplier.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Bid } from '../shared/bid-model'
import { Location } from '@angular/common'



@Component({
    templateUrl: './auction-history-details.component.html',
    styles: [`
    #header{
         margin-top: 40px;
    }
    `]
})
export class AuctionHistoryDetailComponent implements OnInit {

    currentAuctionId: number
    auction: Auction
    auctionBidHistory: Bid[]
    highestBid: number
    supplier: Supplier
    provision: number
   

    private currentTime: number

    constructor(private activeRoute: ActivatedRoute, private auctionService: AuctionService, private supplierService: SupplierService,
        private location: Location, private router: Router) {
        this.currentTime = new Date().getTime()
    }

   

    ngOnInit(): void {
        
        this.currentAuctionId = this.activeRoute.snapshot.params['id']

        this.auctionService.getAuction(this.currentAuctionId).then(res => {
            
            if (res == null) {
                this.router.navigate(['404'])
                return
            }
            this.auction = res

            var endTimeAuction = new Date(res.endTime).getTime()
            if (endTimeAuction > this.currentTime) {
                var buyout = true
                var buyoutAmmount = res.buyNowPrice
            }

            this.supplierService.getSupplier(res.supplierId).then(sup => {

                this.auctionService.getAuctionBidHistory(this.currentAuctionId).then(bids => {
                    let highest = Math.max.apply(Math, bids.map(function (o) { return o.bidPrice; }))

                    if (!buyout) {
                        this.SetSupplierEarning(highest, sup.commission)

                    } else {
                        this.SetSupplierEarning(buyoutAmmount, sup.commission)
                    }

                    this.supplier = sup
                })
            })
        })
    }



    cancel(): void {
        this.location.back()
    }

    SetSupplierEarning(salePrice: number, commission: number): void {
        this.provision = salePrice * commission
    }


}







