import { Component } from '@angular/core'
import { AuctionService } from '../auctions/shared/auction.service'
import { Auction } from '../auctions/shared/auction-model'
import { Bid } from '../auctions/shared/Bid-model'



@Component({
    templateUrl: './sales-report.component.html',
    styles: [`
    #header{
         margin-top: 40px;
    }
    `]
})
export class SalesReportComponent {
    constructor(private auctionService: AuctionService) { }

    auctionHistory: Auction[]

    jan = 0
    feb = 0
    mars = 0
    april = 0
    may = 0
    june = 0
    july = 0
    aug = 0
    setp = 0
    oct = 0
    nov = 0
    dec = 0


    ngOnInit() {
        this.getAuctionHistory()
    }

    getAuctionHistory() {
        this.auctionService.getAuctionHistory().then(res => {
            var arr = []


            res = res.filter(function (res) {
                return res.sold == true
            })


            for (var i = 0; i < res.length; i++) {
                // var endTimeAuction = res[i].endTime
                this.auctionService.getAuctionBidHistory(res[i].id).then(bids => {
                    let highestBid = Math.max.apply(Math, bids.map(function (o) { return o.bidPrice }))

                    let obj = bids.find(function (o) { return o.bidPrice == highestBid })

                    var monthnumber = obj.dateTime.toString().substring(5, 7)
                    if (!isNaN(parseFloat(highestBid)) && isFinite(highestBid)) {
                        switch (monthnumber) {
                            case "01":
                                this.jan = this.jan + highestBid
                                break;
                            case "02":
                                this.feb = this.feb + highestBid
                                break;
                            case "03":
                                this.mars += highestBid
                                break;
                            case "04":
                                this.april += highestBid
                                break;
                            case "05":
                                this.may += highestBid
                                break;
                            case "06":
                                this.june += highestBid
                                break;
                            case "07":
                                this.july += highestBid
                                break;
                            case "08":
                                this.aug += highestBid
                                break;
                            case "09":
                                this.setp += highestBid
                                break;
                            case "10":
                                this.oct += highestBid
                                break;
                            case "11":
                                this.nov += highestBid
                                break;
                            case "12":
                                this.dec += highestBid
                                break;

                            default:
                                console.log("Date parsing error in switch statements..")

                        }
                    }


                })

            }

        })
    }


}

