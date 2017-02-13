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
    constructor(private auctionService: AuctionService) {
        this.currentTime = new Date().getTime()
    }

    auctionHistory: Auction[]
    private currentTime: number

    private jan = 0
    private feb = 0
    private mars = 0
    private april = 0
    private may = 0
    private june = 0
    private july = 0
    private aug = 0
    private setp = 0
    private oct = 0
    private nov = 0
    private dec = 0


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
                var endTimeAuction = new Date(res[i].endTime).getTime()

                if (endTimeAuction > this.currentTime) {
                    let monthnumber = res[i].endTime.toString().substring(5, 7)
                    this.AddAuctionRevenueToMonth(monthnumber, res[i].buyNowPrice)
                    continue
                }

                this.auctionService.getAuctionBidHistory(res[i].id).then(bids => {


                    let highestBid = Math.max.apply(Math, bids.map(function (o) { return o.bidPrice }))

                    if (!isNaN(parseFloat(highestBid)) && isFinite(highestBid) && highestBid > 0) {
                        let obj = bids.find(function (o) { return o.bidPrice == highestBid })
                        var monthnumber = obj.dateTime.toString().substring(5, 7)

                        this.AddAuctionRevenueToMonth(monthnumber, highestBid)
                    }
                })

            }

        })
    }

    AddAuctionRevenueToMonth(month: string, auctionRevenue: number) {
        switch (month) {
            case "01":
                this.jan = this.jan + auctionRevenue
                break;
            case "02":
                this.feb = this.feb + auctionRevenue
                break;
            case "03":
                this.mars += auctionRevenue
                break;
            case "04":
                this.april += auctionRevenue
                break;
            case "05":
                this.may += auctionRevenue
                break;
            case "06":
                this.june += auctionRevenue
                break;
            case "07":
                this.july += auctionRevenue
                break;
            case "08":
                this.aug += auctionRevenue
                break;
            case "09":
                this.setp += auctionRevenue
                break;
            case "10":
                this.oct += auctionRevenue
                break;
            case "11":
                this.nov += auctionRevenue
                break;
            case "12":
                this.dec += auctionRevenue
                break;

            default:
                console.log("Date parsing error in switch statements..")


        }
    }


}

