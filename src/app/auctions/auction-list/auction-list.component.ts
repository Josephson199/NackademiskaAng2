import { Component, OnInit } from '@angular/core';
import { Auction } from '../shared/auction-model'
import { AuctionService } from '../shared/auction.service'
import { Router } from '@angular/router'
import { Category } from '../shared/category-model'

@Component({
  selector: 'auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  auction: Auction
  auctions: Auction[]
  activeAuctions: Auction[] // alltid finnas
  categories: Category[]
  selectedCategoryId: number = 0
  allActiveAuctions: Auction[]

  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    this.getActiveAuctions()
    this.getCategories()

  }

  getCategories(): void {
    this.auctionService.getCategories().then(categories =>
      this.categories = categories)
  }

  getActiveAuctions(): void {

    this.auctionService.getAuctions().then(auctions =>
      this.activeAuctions = auctions.filter(function (auction) {
        let currentTime = new Date()
        let endTimeMs = new Date(auction.endTime)

        return !auction.sold && (endTimeMs > currentTime)
      })
    ).then(x => this.allActiveAuctions = this.activeAuctions)

  }

  filterByCategory(): void {

    if (this.selectedCategoryId != 0) {
      let selectedId = +this.selectedCategoryId


      this.activeAuctions = this.allActiveAuctions.filter(function (auction) {
        return !auction.sold && auction.categoryId == selectedId

      })
    } else {
      this.activeAuctions = this.allActiveAuctions
    }

  }


  searchAuctions(searchTerm: string): void {
    if (searchTerm.length < 1)
      this.activeAuctions = this.allActiveAuctions
    else {

      let term = searchTerm.toLocaleLowerCase()
      this.activeAuctions = this.allActiveAuctions.filter(function (auction) {
        return (auction.name.toLocaleLowerCase().includes(term) || auction.description.toLocaleLowerCase().includes(term))

      })
    }
  }



  goToDetails(auctionId: number): void {
    this.router.navigate(['auction', auctionId])

  }



}




