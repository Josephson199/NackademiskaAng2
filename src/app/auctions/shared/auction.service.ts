import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions  } from '@angular/http'
import { Auction } from './auction-model'
import { Category } from './category-model'
import { Bid } from './bid-model'
import { AuthService } from '../../accounts/shared/auth.service'

import "rxjs/add/operator/toPromise"
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuctionService {


    constructor(private http: Http, private authService: AuthService) { }

    getAuctions(): Promise<Auction[]> {
        return this.http.get('http://nackademiskasecure.azurewebsites.net/api/auction')
            .toPromise()
            .then(response => response.json() as Auction[])
            .catch(this.handleError)
            

    }

    getAuction(id: number): Promise<Auction>{
          return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/auction/${id}`)
                    .toPromise()
                    .then(response => response.json() as Auction)
                    .catch(this.handleError)
    } 

    getCategories(): Promise<Category[]>{
        return this.http.get('http://nackademiskasecure.azurewebsites.net/api/category')
                    .toPromise()
                    .then(response => response.json() as Category[])
                    .catch(this.handleError)
                    
    }

    getAuctionBidHistory(id: number): Promise<Bid[]>{
          return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/bid/${id}`)
                    .toPromise()
                    .then(response => response.json() as Bid[])
                    .catch(this.handleError)
    }

    buyNow(auctionId: number, customerId: number): Promise<boolean>{
        let body = {'auctionId': auctionId, 'customerId': customerId}
        return  this.http.post("http://nackademiskasecure.azurewebsites.net/api/auction/buynow", body, {withCredentials:true})
                .toPromise().then(response => true)
                .catch(response => false)
            
    }

    placeBid(auctionId:number, customerId:number, bidPrice:number): Promise<boolean>{
        let body = { 'auctionId':auctionId, 'customerId': customerId, 'bidPrice':bidPrice }
        return this.http.post("http://nackademiskasecure.azurewebsites.net/api/bid", body, {withCredentials:true})
                .toPromise().then(response => true)
                .catch(response => false)

    }

    getAuctionHistory(): Promise<Auction[]>{
        if(this.authService.isAdmin()){

        let jwtStr = localStorage.getItem('jwtStr')
        let jwt = JSON.parse(jwtStr)
        
           
        
        let headers = new Headers({'Authorization': 'Bearer '+ jwt.token})
        let options = new RequestOptions({ headers: headers })

        return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/auction/sold`,options)
                    .toPromise()
                    .then(response => response.json() as Auction[])
                    .catch(this.handleError)
    }}





    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}



