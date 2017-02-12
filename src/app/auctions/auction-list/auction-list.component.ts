import { Component, OnInit, Input } from '@angular/core';
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
  activeAuctions: Auction[]
  categories: Category[]
  selectedCategoryId: number = 0



  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit() {
    this.getActiveAuctions()
    this.getCategories()
  }

  getCategories(): void {
    this.auctionService.getCategories().then(categories =>
      this.categories = categories)
  }

  getAuctions(): void {
    this.auctionService.getAuctions().then(auctions =>
      this.auctions = auctions)
  }

  getActiveAuctions() {

    this.auctionService.getAuctions().then(activeAuctions =>
      this.activeAuctions = activeAuctions.filter(function (auction) {
        return !auction.sold
      })
    )
  }

filterByCategory() {
   
    if (this.selectedCategoryId != 0) {
        let selectedId = +this.selectedCategoryId

        this.auctionService.getAuctions().then(activeAuctions =>
            this.activeAuctions = activeAuctions.filter(function (auction) {
                return !auction.sold && (auction.categoryId == selectedId)
            }))
    }else{
      this.getActiveAuctions()
    }
  
}

 
  searchAuctions(searchTerm: string) {
    if (searchTerm.length < 1)
      this.getAuctions()
    else {
      let term = searchTerm.toLocaleLowerCase()
      this.activeAuctions = this.activeAuctions.filter(function (auction) {
        return (auction.name.toLocaleLowerCase().includes(term) || auction.description.toLocaleLowerCase().includes(term))

      })
    }
  }




  goToDetails(auctionId: number) {
    this.router.navigate(['auction', auctionId])

  }



}




