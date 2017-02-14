import { Component, OnInit } from '@angular/core'
import { Auction } from '../shared/auction-model'
import { AuctionService } from '../shared/auction.service'
import { Supplier } from '../../suppliers/shared/supplier-model'
import { SupplierService } from '../../suppliers/shared/supplier.service'
import { Bid } from '../shared/bid-model'
import { Router } from '@angular/router'


@Component({
    templateUrl: './auction-history.component.html',
    styles: [`
    #header{
         margin-top: 40px;
    }
    `]
})
export class AuctionHistoryComponent implements OnInit {
    auctionHistory: Auction[] = []


    constructor(private auctionService: AuctionService, private supplierService: SupplierService, private router: Router) { }


    ngOnInit(): void {
        this.getAuctionHistory()

    }



    getAuctionHistory(): void {
        this.auctionService.getAuctionHistory().then(res => {

            this.auctionHistory = res.filter(function (res) {
                return res.sold == true
            })

        })
    }


    goToDetails(auctionId: number): void {
        this.router.navigate(['admin/auctionhistorydetail', auctionId])

    }


    findById(source, id): void {
        for (let k = 0; k < source.length; k++) {
            if (source[k].id === id) {
                return source[k];
            }
        }
        throw "Couldn't find object with id: " + id;
    }
}