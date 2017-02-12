import { Component, OnInit } from '@angular/core';
import { Auction } from '../shared/auction-model'
import { Category } from '../shared/category-model'
import { ActivatedRoute, Params } from '@angular/router'
import { AuctionService } from '../shared/auction.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { Bid } from '../shared/Bid-model'
import { AuthService } from '../../accounts/shared/auth.service'


@Component({
  selector: 'auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {
  currentAuctionId: number
  auction: Auction = new Auction
  bids: Bid[] = []
  highestBid: number = 0
  buyNowResult: boolean
  makeBid: number



  constructor(private activeRoute: ActivatedRoute, private auctionService: AuctionService,
    private router: Router, private location: Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.currentAuctionId = this.activeRoute.snapshot.params['id']


    this.auctionService.getAuction(this.currentAuctionId).then(auction => {
      this.auction = auction
    })

    this.auctionService.getAuctionBidHistory(this.currentAuctionId).then(bids =>
      this.bids = bids.reverse()
    ).then(bids => this.highestBid = Math.max.apply(Math, this.bids.map(function (o) { return o.bidPrice; })))
  }

  


  placeBid(bid: number) {
    let userId = this.authService.user.id
    this.auctionService.placeBid(this.auction.id, userId, bid).then(response => {
      if(response){
        alert("Tack för ditt bud!")
        this.ngOnInit()
      }
    })

  }

  buyNow() {
    let userId = this.authService.user.id

    this.auctionService.buyNow(this.auction.id, userId).then(response => {
      if(response){
        alert("Tack för ditt köp!")
        this.router.navigate(['auctions'])
      }
    })
    

    
  }


  cancel() {
    this.location.back()
  }


  goToRetailer(supplierId: number) {
    this.router.navigate(['supplier', supplierId])
  }



}




