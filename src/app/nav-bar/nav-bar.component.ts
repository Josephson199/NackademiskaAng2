import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auctions/shared/auction.service'
import { Auction } from '../auctions/shared/auction-model'
import { Router } from '@angular/router'
import { AuthService } from '../accounts/shared/auth.service'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  foundAuctions: Auction[]
  


  constructor(private auctionService: AuctionService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }


  logOut(){
    this.authService.logOut()
    this.router.navigate(['auctions'])
  }

}
