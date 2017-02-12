import { Component } from '@angular/core'
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
export class AuctionHistoryComponent {
    auctionHistory: Auction[] = []
   

    constructor(private auctionService: AuctionService, private supplierService: SupplierService, private router: Router) { }


    ngOnInit() {
       this.getAuctionHistory()
        
    }

  

    // getAuctionHistory() {
    //     this.auctionService.getAuctionHistory().then(response => {
    //         this.auctionHistory = response

    //         for (let i = 0; i < response.length; i++) {
    //             this.auctionService.getAuctionBidHistory(response[i].id).then(res => this.auctionBids.push(res))
    //         }
    //     }).then(res => {
    //          this.supplierService.getSuppliers().then(response =>
    //         this.suppliers = response)
    //     }).then(res => {
    //         console.log(this.suppliers, this.auctionHistory, this.auctionBids)
    //     })



    // }

       getAuctionHistory() {
           this.auctionService.getAuctionHistory().then(res => {
               
            this.auctionHistory = res.filter(function(res){
               return res.sold == true
            })
         
           })
       }


        goToDetails(auctionId: number) {
    this.router.navigate(['admin/auctionhistorydetail', auctionId])

  }

      
    


    // compute() {

        

    //     for (let j = 0; j < this.auctionHistory.length; j++) {
    //         let obj = { auctionId: 0, auctionName: "", supplier: new Supplier, provison: 0 }

    //         obj.auctionId = this.auctionHistory[j].id
    //         obj.auctionName = this.auctionHistory[j].name

    //         obj.supplier = this.findById(this.suppliers, this.auctionHistory[j].supplierId)
    //         let rate = obj.supplier.commission
    //         let winBid = 0


    //         for (let n = 0; n < this.auctionBids.length; n++) {


    //             for (let m = 0; m < this.auctionBids[n].length; m++) {

    //                 if (this.auctionBids[n][m].auctionId == this.auctionHistory[j].id) {

    //                     for (var a = 0; a < this.auctionBids[n].length; a++) {
    //                         if (this.auctionBids[n][a].bidPrice > winBid)
    //                             winBid = this.auctionBids[n][a].bidPrice
    //                     }
    //                 }
    //             }

    //         }
    //         obj.provison = winBid * rate
    //         this.array.push(obj)

    //     }
    //     console.log(this.array)

    // }




    findById(source, id) {
        for (let k = 0; k < source.length; k++) {
            if (source[k].id === id) {
                return source[k];
            }
        }
        throw "Couldn't find object with id: " + id;
    }
}